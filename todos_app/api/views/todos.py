from django.utils import timezone
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    RetrieveModelMixin, ListModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin
)

from todos_app.api.filters.todos import IsOwnerFilterBackend
from todos_app.api.serializers.todos import TodoSerializer, CompleteTodoSerializer, SubtaskSerializer
from todos_app.models import Todos


class TodoViewSet(GenericViewSet, ListModelMixin, CreateModelMixin, RetrieveModelMixin,
                  UpdateModelMixin, DestroyModelMixin):
    serializer_class = TodoSerializer
    filter_backends = (IsOwnerFilterBackend,)

    @staticmethod
    def get_serialized(keyword):
        queryset = Todos.objects.filter(parent_id=keyword)
        serializer = TodoSerializer(queryset, many=True)
        data = serializer.data
        return data["json"]

    def get_queryset(self):
        queryset = Todos.objects.filter(user=self.request.user, parent_id__isnull=True)
        status = self.request.query_params.get('status')
        is_not_completed = status == 'current'
        if status:
            queryset = queryset.filter(completed_at__isnull=is_not_completed)
        return queryset

    @extend_schema(parameters=[OpenApiParameter(name='status',
                                                location=OpenApiParameter.QUERY,
                                                description='Todo status', required=False,
                                                type=str, enum=['completed', 'current'])],)
    def list(self, request, *args, **kwargs):
        return super().list(request)

    @action(methods=['post'], url_path='(?P<todo_id>[^/.]+)/createsubtask',
            serializer_class=SubtaskSerializer, detail=False)
    def create_subtask(self, request, todo_id=None):
        request.data['parent_id'] = int(todo_id)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['get'], url_path='(?P<todo_id>[^/.]+)/subtasks',
            serializer_class=SubtaskSerializer, detail=False)
    def get_subtasks(self, request, todo_id=None):
        queryset = self.filter_queryset(self.get_queryset())
        if int(todo_id) not in [i.id for i in queryset]:
            return Response({'detail': "Not found."}, status=status.HTTP_404_NOT_FOUND)
        queryset = queryset.get(pk=todo_id).subtasks.all()

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CompeteTodoViewSet(GenericViewSet, UpdateModelMixin):
    serializer_class = CompleteTodoSerializer
    queryset = Todos.objects.all()
    http_method_names = ('patch',)

    filter_backends = (IsOwnerFilterBackend,)

    def perform_update(self, serializer):
        if serializer.instance.completed_at is None:
            serializer.instance.completed_at = timezone.now()
            serializer.save()


class SubtasksViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
    serializer_class = SubtaskSerializer
    filter_backends = (IsOwnerFilterBackend,)

    def get_queryset(self):
        queryset = Todos.objects.filter(parent_id__isnull=False)
        status = self.request.query_params.get('status')
        if status == 'completed':
            queryset = queryset.filter(completed_at__isnull=False)
        elif status == 'current':
            queryset = queryset.filter(completed_at__isnull=True)
        return queryset

    @extend_schema(parameters=[OpenApiParameter(name='status',
                                                location=OpenApiParameter.QUERY,
                                                description='Todo status', required=False,
                                                type=str, enum=['completed', 'current'])], )
    def list(self, request, *args, **kwargs):
        return super().list(request)

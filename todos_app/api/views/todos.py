from django.utils import timezone
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from rest_framework import status
from rest_framework.decorators import api_view, action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework import generics
from rest_framework.mixins import (
    RetrieveModelMixin, ListModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin
)

from todos_app.api.filters.todos import IsOwnerFilterBackend
from todos_app.api.serializers.todos import TodoSerializer, SubtaskSerializer
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
                                                type=str, enum=['completed', 'current'])], )
    def list(self, request, *args, **kwargs):
        return super().list(request)

    # @action(methods=['post'], url_path='(?P<todo_id>[^/.]+)/subtasks',
    #         serializer_class=SubtaskSerializer, detail=False)
    # def create_subtask(self, request, todo_id=None):
    #     request.data['parent_id'] = int(todo_id)
    #     serializer = self.get_serializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #
    # @action(methods=['get'], url_path='(?P<todo_id>[^/.]+)/subtasks',
    #         serializer_class=SubtaskSerializer, detail=False)
    # def get_subtasks(self, request, todo_id=None):
    #     get_object_or_404(Todos, id=self.kwargs['todo_id'], user=self.request.user, parent_id__isnull=True)
    #     queryset = self.filter_queryset(self.get_queryset())
    #     queryset = queryset.get(pk=todo_id).subtasks.all()
    #
    #     page = self.paginate_queryset(queryset)
    #     if page is not None:
    #         serializer = self.get_serializer(page, many=True)
    #         return self.get_paginated_response(serializer.data)
    #
    #     serializer = self.get_serializer(queryset, many=True)
    #     return Response(serializer.data)


class SubtasksListCreateView(generics.ListCreateAPIView):
    serializer_class = SubtaskSerializer

    def get_queryset(self):
        get_object_or_404(Todos, id=self.kwargs['pk'], user=self.request.user, parent_id__isnull=True)
        return Todos.objects.filter(user=self.request.user, parent_id=self.kwargs['pk'])

    def create(self, request, *args, **kwargs):
        request.data['parent_id'] = kwargs['pk']
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class SubtasksViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
    serializer_class = SubtaskSerializer
    filter_backends = (IsOwnerFilterBackend,)

    def get_queryset(self):
        queryset = Todos.objects.filter(parent_id__isnull=False)
        status = self.request.query_params.get('status')
        is_not_completed = status == 'current'
        if status:
            queryset = queryset.filter(completed_at__isnull=is_not_completed)
        return queryset

    @extend_schema(parameters=[OpenApiParameter(name='status',
                                                location=OpenApiParameter.QUERY,
                                                description='Todo status', required=False,
                                                type=str, enum=['completed', 'current'])], )
    def list(self, request, *args, **kwargs):
        return super().list(request)


@extend_schema(
    summary='Complete task or subtask',
    responses={200: OpenApiTypes.OBJECT},
    examples=[
        OpenApiExample(
            name='Example company details',
            value={
                'completed_at': "2019-12-31T15:53:00Z",
            },
        )
    ],
)
@api_view(['PATCH'])
def complete_todo(request, pk):
    if request.method == 'PATCH':
        todo = get_object_or_404(Todos, user=request.user, id=pk)
        if todo.completed_at is not None:
            return Response({'completed_at': todo.completed_at}, status=200)
        todo.completed_at = timezone.now()
        todo.save()
        return Response({'completed_at': todo.completed_at}, status=200)

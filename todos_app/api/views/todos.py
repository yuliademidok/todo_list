from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    RetrieveModelMixin, ListModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin
)

from ..filters.todos import IsOwnerFilterBackend
from ...api.serializers.todos import TodoSerializer, CreateTodoSerializer, CompleteTodoSerializer
from ...models import Todos


class TodoViewSet(GenericViewSet, ListModelMixin, CreateModelMixin, RetrieveModelMixin,
                  UpdateModelMixin, DestroyModelMixin):
    serializer_class = TodoSerializer
    queryset = Todos.objects.all()

    filter_backends = (IsOwnerFilterBackend, )

    actions_serializers = {
        'create': CreateTodoSerializer,
        'update': CreateTodoSerializer,
        'partial_update': CreateTodoSerializer,
    }

    def get_serializer_class(self):
        return self.actions_serializers.get(self.action, self.serializer_class)

    @action(methods=['get'], url_path='completed', detail=False)
    def completed_todos(self, request):
        queryset = self.get_queryset().filter(user=request.user, completed_at__isnull=False)
        serializer = self.get_serializer(instance=queryset, many=True)
        return Response(serializer.data)

    @action(methods=['get'], url_path='current', detail=False)
    def current_todos(self, request):
        queryset = self.get_queryset().filter(user=request.user, completed_at__isnull=True)
        serializer = self.get_serializer(instance=queryset, many=True)
        return Response(serializer.data)


class CompeteTodoViewSet(GenericViewSet, UpdateModelMixin):
    serializer_class = CompleteTodoSerializer
    queryset = Todos.objects.all()
    http_method_names = ('patch', )

    filter_backends = (IsOwnerFilterBackend, )

    def perform_update(self, serializer):
        if serializer.instance.completed_at is None:
            serializer.instance.completed_at = timezone.now()
            serializer.save()

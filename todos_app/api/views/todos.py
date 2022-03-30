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
        "create": CreateTodoSerializer,
        "update": CreateTodoSerializer,
        "partial_update": CreateTodoSerializer,
    }

    def get_serializer_class(self):
        return self.actions_serializers.get(self.action, self.serializer_class)

    # @action(methods=['patch'], url_path='(?P<todo_id>[^/.]+)/complete', detail=False)
    # def complete(self, request, todo_id=None):
    #     queryset = Todos.objects.filter(id=todo_id, user=request.user)
    #     serializer = CompleteTodoSerializer(instance=queryset, data=request.data, many=False, partial=True)
    #
    #     if serializer.is_valid():
    #         serializer.data['completed_at'] = timezone.now()
    #         serializer = serializer
    #         serializer.save()
    #     return Response(serializer.data)


class CompeteTodoViewSet(GenericViewSet, UpdateModelMixin):
    serializer_class = CompleteTodoSerializer
    queryset = Todos.objects.all()
    http_method_names = ("patch", )

    filter_backends = (IsOwnerFilterBackend, )

    def perform_update(self, serializer):
        if serializer.instance.completed_at is None:
            serializer.instance.completed_at = timezone.now()
            serializer.save()

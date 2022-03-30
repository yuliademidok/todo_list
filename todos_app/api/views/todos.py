from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    RetrieveModelMixin, ListModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin
)

from ..filters.todos import IsOwnerFilterBackend
from ...api.serializers.todos import TodoSerializer, CreateTodoSerializer
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

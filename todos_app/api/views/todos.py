from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    RetrieveModelMixin, ListModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin
)

from ..filters.todos import IsOwnerFilterBackend
from ...api.serializers.todos import TodoSerializer
from ...models import Todos


class TodoViewSet(GenericViewSet, ListModelMixin):
    serializer_class = TodoSerializer
    queryset = Todos.objects.all()

    filter_backends = (IsOwnerFilterBackend, )

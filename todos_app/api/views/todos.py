from django.utils import timezone
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    RetrieveModelMixin, ListModelMixin, CreateModelMixin, UpdateModelMixin, DestroyModelMixin
)

from todos_app.api.filters.todos import IsOwnerFilterBackend
from todos_app.api.serializers.todos import TodoSerializer, CreateTodoSerializer, CompleteTodoSerializer
from todos_app.models import Todos


class TodoViewSet(GenericViewSet, ListModelMixin, CreateModelMixin, RetrieveModelMixin,
                  UpdateModelMixin, DestroyModelMixin):
    serializer_class = TodoSerializer
    filter_backends = (IsOwnerFilterBackend,)

    def get_queryset(self):
        queryset = Todos.objects.all()
        status = self.request.query_params.get('status')
        if status == 'completed':
            queryset = queryset.filter(completed_at__isnull=False)
        elif status == 'current':
            queryset = queryset.filter(completed_at__isnull=True)
        return queryset

    @extend_schema(parameters=[OpenApiParameter(name='status',
                                                location=OpenApiParameter.QUERY,
                                                description='Todo status', required=False,
                                                type=str, enum=['completed', 'current'])],)
    def list(self, request, *args, **kwargs):
        return super().list(request)

    actions_serializers = {
        'create': CreateTodoSerializer,
        'update': CreateTodoSerializer,
        'partial_update': CreateTodoSerializer,
    }

    def get_serializer_class(self):
        return self.actions_serializers.get(self.action, self.serializer_class)


class CompeteTodoViewSet(GenericViewSet, UpdateModelMixin):
    serializer_class = CompleteTodoSerializer
    queryset = Todos.objects.all()
    http_method_names = ('patch',)

    filter_backends = (IsOwnerFilterBackend,)

    def perform_update(self, serializer):
        if serializer.instance.completed_at is None:
            serializer.instance.completed_at = timezone.now()
            serializer.save()

from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin, UpdateModelMixin

from ...api.serializers.accounts import UserSerializer


class IsCreationOrIsAuthenticated(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action == 'create' or request.user.is_authenticated:
            return True
        else:
            return False

    def has_object_permission(self, request, view, obj):
        return obj == request.user


class UserViewSet(GenericViewSet, CreateModelMixin, UpdateModelMixin):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = (IsCreationOrIsAuthenticated, )

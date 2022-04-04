from django.contrib.auth.models import User
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin, UpdateModelMixin, RetrieveModelMixin

from accounts_app.api.permissions import IsCreationOrIsAuthenticated
from accounts_app.api.serializers.accounts import UserSerializer, PasswordSerializer, UpdateUserSerializer


class UserViewSet(GenericViewSet, CreateModelMixin, UpdateModelMixin, RetrieveModelMixin):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = (IsCreationOrIsAuthenticated, )

    actions_serializers = {
        'update': UpdateUserSerializer,
        'partial_update': UpdateUserSerializer,
    }

    def get_serializer_class(self):
        return self.actions_serializers.get(self.action, self.serializer_class)


class ChangePasswordViewSet(GenericViewSet, CreateModelMixin):
    serializer_class = PasswordSerializer
    queryset = User.objects.all()

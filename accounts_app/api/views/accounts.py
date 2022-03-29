from django.contrib.auth.models import User
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin

from ...api.serializers.accounts import UserSerializer


class UserViewSet(GenericViewSet, CreateModelMixin):
    serializer_class = UserSerializer
    queryset = User.objects.all()


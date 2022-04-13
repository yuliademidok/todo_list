from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
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

    @action(methods=['post'], url_path='changepassword', serializer_class=PasswordSerializer, detail=False)
    def change_password(self, request):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.contrib.auth.models import User
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import UpdateModelMixin, RetrieveModelMixin

from accounts_app.api.permissions import IsCreationOrIsAuthenticated
from accounts_app.api.serializers.accounts import UserSerializer, PasswordSerializer, UpdateUserSerializer


@extend_schema(
    responses={201: UserSerializer},
    request=UserSerializer,
)
@api_view(['POST'])
@permission_classes((AllowAny,))
def signup(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)


class UserViewSet(GenericViewSet, UpdateModelMixin, RetrieveModelMixin):
    serializer_class = UpdateUserSerializer
    queryset = User.objects.all()

    permission_classes = (IsCreationOrIsAuthenticated, )


@extend_schema(
    responses={200: PasswordSerializer},
    request=PasswordSerializer,
)
@api_view(['POST'])
def change_password(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = PasswordSerializer(data=data, context=request, many=False)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=200)

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

    @action(methods=['post'], url_path='changepassword', serializer_class=PasswordSerializer, detail=False)
    def change_password(self, request):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

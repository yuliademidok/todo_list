from rest_framework import routers

from ..api.views.accounts import UserViewSet, ChangePasswordViewSet

api_router = routers.DefaultRouter()
api_router.register('user', UserViewSet)
api_router.register('user/change_password', ChangePasswordViewSet)

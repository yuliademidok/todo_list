from rest_framework import routers

from accounts_app.api.views.accounts import UserViewSet, ChangePasswordViewSet

api_router = routers.DefaultRouter()
api_router.register('user/change_password', ChangePasswordViewSet)
api_router.register('user', UserViewSet)

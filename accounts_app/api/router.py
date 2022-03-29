from rest_framework import routers

from ..api.views.accounts import UserViewSet

api_router = routers.DefaultRouter()
api_router.register('user', UserViewSet)

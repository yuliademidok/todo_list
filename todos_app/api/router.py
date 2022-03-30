from rest_framework import routers

from ..api.views.todos import TodoViewSet

api_router = routers.DefaultRouter()
api_router.register('todo', TodoViewSet)

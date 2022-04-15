from rest_framework import routers

from todos_app.api.views.todos import TodoViewSet, SubtasksViewSet

api_router = routers.DefaultRouter()
api_router.register('subtasks', SubtasksViewSet, basename='SubtasksViewSet')
api_router.register('', TodoViewSet, basename='TodoViewSet')

from rest_framework import routers

from todos_app.api.views.todos import TodoViewSet, CompeteTodoViewSet

api_router = routers.DefaultRouter()
api_router.register('todo', TodoViewSet)
api_router.register('todo/complete', CompeteTodoViewSet)

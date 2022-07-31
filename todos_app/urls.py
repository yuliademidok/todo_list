from django.urls import path, include

from todos_app.api.views.todos import SubtasksListCreateView, complete_todo
from todos_app.api.router import api_router

app_name = 'todos'
urlpatterns = [
    path('<int:pk>/subtasks', SubtasksListCreateView.as_view(), name='todo_subtasks'),
    path('complete/<int:pk>/', complete_todo, name='complete_todo'),
    path('', include(api_router.urls)),
]

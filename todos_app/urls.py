from django.urls import path

from todos_app.api.views.todos import SubtasksListCreateView, complete_todo

app_name = 'todos'
urlpatterns = [
    path('<int:pk>/subtasks', SubtasksListCreateView.as_view()),
    path('complete/<int:pk>/', complete_todo),
]

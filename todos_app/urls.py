from django.urls import path

from todos_app import views
from todos_app.api.views.todos import SubtasksListCreateView, complete_todo

app_name = 'todos'
urlpatterns = [
    # path('', views.CurrentTodosView.as_view(), name='currenttodos'),
    # path('all/', views.AllTodosView.as_view(), name='alltodos'),
    # path('completed/', views.CompletedTodosView.as_view(), name='completedtodos'),
    # path('new/', views.CreateTodoView.as_view(), name='createtodo'),
    # path('todo/<int:pk>/new_subtask/', views.CreateSubtaskView.as_view(), name='createsubtask'),
    # path('todo/<int:pk>/', views.UpdateTodoView.as_view(), name='updatetodo'),
    # path('todo/<int:pk>/delete/', views.DeleteTodoView.as_view(), name='deletetodo'),
    # path('todo/<int:pk>/complete/', views.complete_todo, name='completetodo'),

    path('<int:pk>/subtasks', SubtasksListCreateView.as_view()),
    path('complete/<int:pk>/', complete_todo),
]

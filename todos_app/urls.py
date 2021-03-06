from django.urls import path

from . import views

app_name = 'todos'
urlpatterns = [
    path('', views.CurrentTodosView.as_view(), name='currenttodos'),
    path('all/', views.AllTodosView.as_view(), name='alltodos'),
    path('completed/', views.CompletedTodosView.as_view(), name='completedtodos'),
    path('new/', views.CreateTodoView.as_view(), name='createtodo'),
    path('todo/<int:pk>/', views.UpdateTodoView.as_view(), name='updatetodo'),
    path('todo/<int:pk>/delete/', views.DeleteTodoView.as_view(), name='deletetodo'),
    path('todo/<int:pk>/complete/', views.complete_todo, name='completetodo'),
]

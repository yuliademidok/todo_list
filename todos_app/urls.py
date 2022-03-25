from django.urls import path

from . import views

app_name = 'todos'
urlpatterns = [
    path('', views.CurrentTodosView.as_view(), name="currenttodos"),
    path('all/', views.AllTodosView.as_view(), name="alltodos"),
    path('completed/', views.CompletedTodosView.as_view(), name="completedtodos"),
]

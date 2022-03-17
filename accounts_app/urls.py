from django.urls import path

from . import views

app_name = 'accounts'
urlpatterns = [
    path('', views.main_dummy_page, name="main"),
    path('login/', views.Login.as_view(), name="login"),
]

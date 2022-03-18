from django.contrib.auth.views import LogoutView
from django.urls import path

from . import views

app_name = 'accounts'
urlpatterns = [
    path('login/', views.Login.as_view(), name="login"),
    path('logout/', LogoutView.as_view(), name="logout"),
]

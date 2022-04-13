from django.contrib.auth.views import LogoutView
from django.urls import path

from accounts_app import views

app_name = 'accounts'
urlpatterns = [
    path('login/', views.Login.as_view(), name="login"),
    path('logout/', LogoutView.as_view(), name="logout"),
    path('signup/', views.SignUpView.as_view(), name="signup"),
    path('profile/<int:pk>/', views.profile, name='profile'),
]

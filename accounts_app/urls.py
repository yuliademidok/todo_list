from django.contrib.auth.views import LogoutView
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenRefreshSlidingView

from accounts_app import views
from accounts_app.api.views.accounts import signup, change_password

app_name = 'accounts'
urlpatterns = [
    # path('login/', views.Login.as_view(), name="login"),
    # path('logout/', LogoutView.as_view(), name="logout"),
    # path('signup/', views.SignUpView.as_view(), name="signup"),
    # path('profile/<int:pk>/', views.profile, name='profile'),

    # Auth
    path('signup/', signup),
    path('login/', TokenObtainPairView.as_view()),
    path('refreshtoken/', TokenRefreshView.as_view()),
    path('changepassword/', change_password),
]

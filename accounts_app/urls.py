from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from accounts_app.api.views.accounts import signup, change_password

app_name = 'accounts'
urlpatterns = [
    path('signup/', signup),
    path('login/', TokenObtainPairView.as_view()),
    path('refreshtoken/', TokenRefreshView.as_view()),
    path('changepassword/', change_password),
]

from django.contrib.auth.views import LoginView
from django.shortcuts import render


class Login(LoginView):
    template_name = 'accounts_app/login.html'

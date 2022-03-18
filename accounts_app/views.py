from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView
from django.http import HttpResponse
from django.shortcuts import render


@login_required
def main_dummy_page(request):
    return HttpResponse("<html><body>Hi</body></html>")


class Login(LoginView):
    template_name = 'accounts_app/login.html'

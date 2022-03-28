from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.contrib.auth.views import LoginView
from django.urls import reverse_lazy
from django.views import generic
from django.contrib.messages.views import SuccessMessageMixin
from django.shortcuts import render, get_object_or_404

from .forms import UserSignUpForm
from .models import Profile


class Login(LoginView):
    template_name = 'accounts_app/login.html'

    def get_context_data(self, *, object_list=None, **kwargs):
        data = super().get_context_data(**kwargs)
        data['title'] = 'Login'
        return data


class SignUpView(SuccessMessageMixin, generic.CreateView):
    template_name = 'accounts_app/register.html'
    success_message = 'You account was successfully created!'
    success_url = reverse_lazy('accounts:login')
    form_class = UserSignUpForm

    def get_context_data(self, *, object_list=None, **kwargs):
        data = super().get_context_data(**kwargs)
        data['title'] = 'Registration'
        return data


@login_required
def profile(request, pk):
    return render(request, 'accounts_app/profile.html', {'title': "My Profile"})

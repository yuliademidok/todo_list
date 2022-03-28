from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms


class UserSignUpForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('username', 'email', )

    username = forms.CharField()

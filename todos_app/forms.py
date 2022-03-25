from django.forms import ModelForm

from .models import Todos


class TodoForm(ModelForm):
    class Meta:
        model = Todos
        fields = ('title', 'description', 'priority')

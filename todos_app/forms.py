from django.forms import ModelForm

from todos_app.models import Todos


class TodoForm(ModelForm):
    class Meta:
        model = Todos
        fields = ('title', 'description', 'priority')

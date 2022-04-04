from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.urls import reverse_lazy
from django.utils import timezone
from django.views import generic
from django.shortcuts import get_object_or_404, redirect

from todos_app.forms import TodoForm
from todos_app.models import Todos


class CurrentTodosView(LoginRequiredMixin, generic.ListView):
    template_name = 'todos_app/todos.html'
    context_object_name = 'todos'

    def get_queryset(self):
        todos = Todos.objects.filter(
            user=self.request.user,
            completed_at__isnull=True
        ).values('id', 'title', 'description', 'priority')
        return todos

    def get_context_data(self, *, object_list=None, **kwargs):
        data = super().get_context_data(**kwargs)
        data['title'] = "Current todos"
        data['todos_status'] = "current"
        return data


class AllTodosView(LoginRequiredMixin, generic.ListView):
    template_name = 'todos_app/todos.html'
    context_object_name = 'todos'

    def get_queryset(self):
        todos = Todos.objects.filter(
            user=self.request.user
        ).values('id', 'title', 'description', 'priority', 'completed_at')
        return todos

    def get_context_data(self, *, object_list=None, **kwargs):
        data = super().get_context_data(**kwargs)
        data['title'] = 'All todos'
        data['todos_status'] = ''
        return data


class CompletedTodosView(LoginRequiredMixin, generic.ListView):
    template_name = 'todos_app/todos.html'
    context_object_name = 'todos'

    def get_queryset(self):
        todos = Todos.objects.filter(
            user=self.request.user,
            completed_at__isnull=False
        ).values('id', 'title', 'description', 'priority', 'completed_at')
        return todos

    def get_context_data(self, *, object_list=None, **kwargs):
        data = super().get_context_data(**kwargs)
        data['title'] = 'Completed todos'
        data['todos_status'] = 'completed'
        return data


class CreateTodoView(LoginRequiredMixin, SuccessMessageMixin, generic.CreateView):
    model = Todos
    form_class = TodoForm
    template_name = 'todos_app/create_todo.html'
    success_url = reverse_lazy('todos:currenttodos')
    success_message = 'New todo is successfully added!'

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super(CreateTodoView, self).form_valid(form)

    def get_context_data(self, *, object_list=None, **kwargs):
        data = super().get_context_data(**kwargs)
        data['title'] = 'Create todo'
        return data


class UpdateTodoView(LoginRequiredMixin, SuccessMessageMixin, generic.UpdateView):
    model = Todos
    form_class = TodoForm
    template_name = 'todos_app/updatetodo.html'
    success_url = reverse_lazy('todos:currenttodos')
    success_message = 'Todo is successfully updated!'

    def get_object(self, queryset=None):
        self.object = get_object_or_404(Todos, pk=self.kwargs['pk'], user=self.request.user)
        return self.object

    def get_context_data(self, *, object_list=None, **kwargs):
        data = super().get_context_data(**kwargs)
        data['todo'] = self.object
        data['title'] = data['todo']
        return data


class DeleteTodoView(LoginRequiredMixin, SuccessMessageMixin, generic.DeleteView):
    model = Todos
    success_url = reverse_lazy('todos:currenttodos')
    success_message = 'Todo is successfully deleted!'

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super(DeleteTodoView, self).form_valid(form)


@login_required
def complete_todo(request, pk):
    todo = get_object_or_404(Todos, pk=pk, user=request.user)
    if request.method == 'POST' and todo.completed_at is None:
        todo.completed_at = timezone.now()
        todo.save()
        return redirect('todos:currenttodos')

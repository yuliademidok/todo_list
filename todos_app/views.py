from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.urls import reverse_lazy
from django.views import generic
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages

from .forms import TodoForm
from .models import Todos


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
        ).values('id', 'title', 'description', 'priority')
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
        ).values('id', 'title', 'description', 'priority')
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


class UpdateTodoView(LoginRequiredMixin, SuccessMessageMixin, generic.UpdateView):
    model = Todos
    form_class = TodoForm
    template_name = 'todos_app/updatetodo.html'
    success_url = reverse_lazy('todos:currenttodos')
    success_message = 'Todo is successfully updated!'

    def get_object(self, queryset=None):
        self.object = get_object_or_404(Todos, pk=self.kwargs['pk'], user=self.request.user)
        return self.object

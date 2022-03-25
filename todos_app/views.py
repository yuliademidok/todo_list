from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import generic
from django.shortcuts import render, redirect
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


class CreateTodoView(LoginRequiredMixin, generic.CreateView):
    template_name = 'todos_app/create_todo.html'

    def get(self, request, *args, **kwargs):
        context = {'form': TodoForm(), 'title': 'Create todo'}
        return render(request, self.template_name, context)

    def post(self, request, *args, **kwargs):
        form = TodoForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            todo = Todos(**data, user=request.user)
            todo.save()
            messages.success(request, 'New todo is successfully added')
            return redirect('todos:currenttodos')
        return render(request, self.template_name, {'form': form})

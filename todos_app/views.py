from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import generic
from django.shortcuts import render

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
        data["title"] = "Current todos"
        data["todos_status"] = "current"
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
        data["title"] = "All todos"
        data["todos_status"] = ""
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
        data["title"] = "Completed todos"
        data["todos_status"] = "completed"
        return data

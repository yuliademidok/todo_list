from django.test import SimpleTestCase
from django.urls import reverse, resolve

from todos_app.views import CurrentTodosView, UpdateTodoView, complete_todo


class TestUrls(SimpleTestCase):
    def test_current_todos_url_resolves(self):
        url = reverse('todos:currenttodos')
        self.assertEqual(resolve(url).func.view_class, CurrentTodosView)

    def test_todo_url_resolves(self):
        url = reverse('todos:updatetodo', args=['1'])
        self.assertEqual(resolve(url).func.view_class, UpdateTodoView)

    def test_todo_complete_url_resolves(self):
        url = reverse('todos:completetodo', args=['1'])
        self.assertEqual(resolve(url).func, complete_todo)

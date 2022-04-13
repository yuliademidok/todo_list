from django.contrib.auth.models import User
from django.test import TestCase, Client
from django.urls import reverse

from todos_app.models import Todos


class TestView(TestCase):
    def setUp(self):
        self.client = Client()
        self.credentials = {'username': 'test', 'password': 'testpass1'}
        self.user = User.objects.create_user(**self.credentials)
        self.client.login(**self.credentials)
        self.todo_1 = Todos.objects.create(
            title='Todo Test 1',
            priority=2,
            description='Description todo 1',
            user=self.user)

        self.current_todos_url = reverse('todos:currenttodos')
        self.all_todos_url = reverse('todos:alltodos')
        self.comleted_todos_url = reverse('todos:completedtodos')
        self.create_todo_url = reverse('todos:createtodo')
        self.update_todo_url = reverse('todos:updatetodo', args=[self.todo_1.id])

    def test_current_todos_GET(self):
        response = self.client.get(self.current_todos_url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'todos_app/todos.html')

    def test_all_todos_GET(self):
        response = self.client.get(self.all_todos_url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'todos_app/todos.html')

    def test_completed_todos_GET(self):
        response = self.client.get(self.comleted_todos_url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'todos_app/todos.html')

    def test_view_todo_GET(self):
        response = self.client.get(self.update_todo_url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'todos_app/updatetodo.html')

    def test_todo_POST(self):
        response = self.client.post(self.create_todo_url, {
            'title': 'Todo Test 2',
            'priority': 1,
            'description': 'Description todo 2'
        })
        self.assertEqual(response.status_code, 302)
        self.assertEqual(self.user.todos.first().title, 'Todo Test 2')
        self.assertEqual(self.user.todos.first().priority, 1)
        self.assertEqual(self.user.todos.first().description, 'Description todo 2')

    def test_todo_no_data_POST(self):
        todos_count_before = Todos.objects.count()
        response = self.client.post(self.create_todo_url, {})
        todos_count_after = Todos.objects.count()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(todos_count_before, todos_count_after)

    def test_todo_DELETE(self):
        todo = Todos.objects.create(
            title='Todo Test 3',
            priority=3,
            description='Description todo 3',
            user=self.user)

        todos_count_before = Todos.objects.count()
        response = self.client.delete(reverse('todos:deletetodo', args=[todo.id]))
        todos_count_after = Todos.objects.count()

        self.assertEqual(response.status_code, 302)
        self.assertEqual(todos_count_before, todos_count_after + 1)

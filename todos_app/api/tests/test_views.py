from django.contrib.auth.models import User
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from todos_app.models import Todos


class TestTodosApi(APITestCase):
    def setUp(self):
        self.credentials = {'username': 'test', 'password': 'testpass1'}
        self.client.post(reverse('UserViewSet-list'), self.credentials)
        login_response = self.client.post(reverse('token_obtain_pair'), self.credentials)
        self.access_token = login_response.data['access']
        self.user = User.objects.get(username='test')
        self.client.force_authenticate(user=self.user, token=self.access_token)

        self.todo_1 = Todos.objects.create(
            title='Todo Test 1',
            priority=2,
            description='Description todo 1',
            user=self.user
        )

        self.subtasks_1 = Todos.objects.create(
            title='Subtask 1',
            description='Subtask 1 description',
            priority=1,
            user=self.user,
            parent_id=self.todo_1
        )

        self.todos_url = reverse('TodoViewSet-list')
        self.todo_url = reverse('TodoViewSet-detail', args=[self.todo_1.id])
        self.subtask_url = reverse('SubtasksViewSet-detail', args=[self.subtasks_1.id])
        self.create_subtask_url = reverse('TodoViewSet-create-subtask', args=[self.todo_1.id])

    def test_create_todo(self):
        todos_count_before = Todos.objects.count()
        response = self.client.post(self.todos_url, {
            'title': 'Todo Test 2',
            'priority': 1,
            'description': 'Description todo 2'
        })
        todos_count_after = Todos.objects.count()
        self.assertEqual(response.status_code, 201)
        self.assertEqual(todos_count_before + 1, todos_count_after)
        self.assertEqual(response.data['title'], 'Todo Test 2')
        self.assertEqual(response.data['priority'], 1)
        self.assertEqual(response.data['description'], 'Description todo 2')

    def test_get_all_todos(self):
        response = self.client.get(self.todos_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['count'], 1)
        self.assertContains(response, self.todo_1)
        self.assertIsInstance(response.data['results'], list)

    def test_get_completed_todos(self):
        response = self.client.get(f'{self.todos_url}?status=completed')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['count'], 0)
        self.assertIsInstance(response.data['results'], list)

    def test_get_current_todos(self):
        response = self.client.get(f'{self.todos_url}?status=current')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['count'], 1)
        self.assertContains(response, self.todo_1)
        self.assertIsInstance(response.data['results'], list)

    def test_get_todo(self):
        response = self.client.get(self.todo_url)
        self.assertEqual(response.status_code, 200)

    def test_delete_todo(self):
        todo = Todos.objects.create(
            title='Todo Test 3',
            priority=2,
            description='Description todo 3',
            user=self.user
        )
        todos_count_before = Todos.objects.count()
        response = self.client.delete(reverse('TodoViewSet-detail', args=[todo.id]))
        todos_count_after = Todos.objects.count()
        self.assertEqual(response.status_code, 204)
        self.assertEqual(todos_count_before - 1, todos_count_after)

    def test_update_todo(self):
        todo = Todos.objects.create(
            title='Todo Test 4',
            priority=2,
            description='Description todo 3',
            user=self.user
        )
        response = self.client.patch(reverse('TodoViewSet-detail', args=[todo.id]), {
            'priority': 3,
        })
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['priority'], 3)

    def test_complete_todo(self):
        todo = Todos.objects.create(
            title='Todo Test 5',
            priority=1,
            description='Description todo 5',
            user=self.user
        )
        complete_todo_url = reverse('todos-detail', args=[todo.id])
        response = self.client.patch(complete_todo_url)
        self.assertEqual(response.status_code, 200)
        self.assertNotEqual(response.data['completed_at'], None)

    def test_get_subtasks(self):
        response = self.client.get(self.subtask_url)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, self.subtasks_1)

    def test_create_subtask(self):
        response = self.client.post(self.create_subtask_url, {
            'title': 'Subtask 2',
            'description': 'Subtask 2 description',
            'priority': 2
        }, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['title'], 'Subtask 2')
        self.assertEqual(response.data['description'], 'Subtask 2 description')
        self.assertEqual(response.data['priority'], 2)
        self.assertEqual(response.data['completed_at'], None)
        self.assertEqual(response.data['parent_id'], self.todo_1.id)

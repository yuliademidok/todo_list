from django.contrib.auth import get_user_model
from django.test import TestCase, Client
from django.urls import reverse


class TestView(TestCase):
    def setUp(self):
        self.client = Client()
        self.credentials = {
            'username': 'test',
            'email': 'test@email.com',
            'password1': 'testpass1',
            'password2': 'testpass1',
        }

        self.signup_page = reverse('accounts:signup')
        self.login_page = reverse('accounts:login')

    def test_signup_page_url(self):
        response = self.client.get(self.signup_page)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'accounts_app/register.html')

    def test_signup_POST(self):
        response = self.client.post(self.signup_page, data=self.credentials)
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, self.login_page)

        users = get_user_model().objects.all()
        self.assertEqual(users.count(), 1)

from django.test import SimpleTestCase
from django.urls import reverse, resolve

from accounts_app.views import Login, SignUpView, profile


class TestUrls(SimpleTestCase):
    def test_login_url_resolves(self):
        url = reverse('accounts:login')
        self.assertEqual(resolve(url).func.view_class, Login)

    def test_signup_url_resolves(self):
        url = reverse('accounts:signup')
        self.assertEqual(resolve(url).func.view_class, SignUpView)

    def test_profile_url_resolves(self):
        url = reverse('accounts:profile', args=['1'])
        self.assertEqual(resolve(url).func, profile)

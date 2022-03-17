from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False, related_name='profile')
    avatar = models.ImageField(upload_to='profile_images', default='profile_default.png')

    class Meta:
        db_table = "profile"

    def __str__(self):
        return self.user.username

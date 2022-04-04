from django.contrib.auth.models import User
from django.db import models


class Priority(models.IntegerChoices):
    HIGH = 1, 'High'
    MEDIUM = 2, 'Medium'
    LOW = 3, 'Low'


class Todos(models.Model):
    title = models.CharField(max_length=64, null=False, blank=False)
    description = models.TextField(max_length=256, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    priority = models.PositiveSmallIntegerField(choices=Priority.choices, default=2)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='todos')

    class Meta:
        db_table = 'todos'
        ordering = ('-id', '-created_at', )

    def __str__(self):
        return self.title

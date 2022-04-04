from django.contrib import admin

from todos_app.models import Todos


@admin.register(Todos)
class TodosAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'user', )

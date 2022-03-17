from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

from .models import Profile


class ProfileInline(admin.StackedInline):
    model = Profile


admin.site.unregister(User)


@admin.register(User)
class UserAdmin(UserAdmin):
    list_display = ('id', 'username', 'email', )
    fieldsets = (
        (None, {'fields': ('username', 'password', 'first_name', 'last_name', 'email')}),
    )
    inlines = (ProfileInline, )
    search_fields = ('username', )
    sortable_by = ('id', 'username', )
    ordering = ('-id', )

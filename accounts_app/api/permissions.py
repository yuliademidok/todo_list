from rest_framework import permissions


class IsCreationOrIsAuthenticated(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action == 'create' or request.user.is_authenticated:
            return True
        else:
            return False

    def has_object_permission(self, request, view, obj):
        return obj == request.user

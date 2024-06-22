from rest_framework.permissions import BasePermission
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

class IsInAdminsGroup(BasePermission):
    """
    Allows access only to users that are in 'admins' group.
    """

    def has_permission(self, request, view):
        if "admins" in request.user.groups.first().name:
            return True
        return False
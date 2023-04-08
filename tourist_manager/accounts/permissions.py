from rest_framework import permissions
from .models import Profile, User

class IsOfficeAdmin(permissions.BasePermission):
    message = "Staff Permission Level Restricted"
    
    def has_permission(self, request, view):
        user = User.objects.get(pk=request.user.pk)
        try:
            if user.profile.account_type == 'office_admin':
                return True
        except User.DoesNotExist:
            return False
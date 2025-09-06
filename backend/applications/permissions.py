from rest_framework import permissions

class IsJobSeeker(permissions.BasePermission):
    """
    Custom permission to only allow users with the JOB_SEEKER role.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'JOB_SEEKER'
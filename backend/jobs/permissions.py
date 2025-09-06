from rest_framework import permissions

class IsEmployer(permissions.BasePermission):
    """
    Custom permission to only allow users with the EMPLOYER role.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'EMPLOYER'
    
class IsEmployerAndOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Allow GET requests for anyone
        if request.method in permissions.SAFE_METHODS:
            return True
        # Write permissions are only allowed to the employer who owns the job
        return obj.employer == request.user and request.user.role == 'EMPLOYER'
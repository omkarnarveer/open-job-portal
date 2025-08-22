from rest_framework import viewsets, permissions
from .models import Application
from .serializers import ApplicationSerializer

class IsJobSeeker(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "JOB_SEEKER"

class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            if user.role == "EMPLOYER":
                return Application.objects.filter(job__employer=user).select_related("job", "seeker")
            return Application.objects.filter(seeker=user).select_related("job", "seeker")
        return Application.objects.none()

    def get_permissions(self):
        if self.action == "create":
            return [IsJobSeeker()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(seeker=self.request.user)
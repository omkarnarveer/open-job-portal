from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Application
from .serializers import ApplicationSerializer
from .permissions import IsJobSeeker

class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    def get_permissions(self):
        if self.action == 'create':
            # Use the new, dedicated permission class
            self.permission_classes = [IsJobSeeker]
        else:
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()

    def get_queryset(self):
        user = self.request.user
        if user.role == 'EMPLOYER':
            return Application.objects.filter(job__employer=user)
        elif user.role == 'JOB_SEEKER':
            return Application.objects.filter(seeker=user)
        return Application.objects.none()

    def perform_create(self, serializer):
        serializer.save(seeker=self.request.user)
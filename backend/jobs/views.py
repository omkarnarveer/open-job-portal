from rest_framework import viewsets, permissions
from .models import Job
from .serializers import JobSerializer
from .filters import JobFilter
from .permissions import IsEmployerAndOwner, IsEmployer
from django_filters.rest_framework import DjangoFilterBackend

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.filter(is_filled=False).order_by('-created_at')
    serializer_class = JobSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = JobFilter

    def get_permissions(self):
        if self.action == 'create':
            # Use the new, dedicated permission class instead of the lambda
            self.permission_classes = [IsEmployer]
        elif self.action in ['update', 'partial_update', 'destroy']:
            self.permission_classes = [IsEmployerAndOwner]
        else:
            self.permission_classes = [permissions.AllowAny]
        return super().get_permissions()

    def perform_create(self, serializer):
        serializer.save(employer=self.request.user)
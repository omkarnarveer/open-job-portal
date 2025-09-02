from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .models import Application
from .serializers import ApplicationSerializer
# Correct import path for IsEmployer
from accounts.permissions import IsEmployer
# Correct import path for IsJobSeeker
from .permissions import IsJobSeeker

class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            if user.role == "EMPLOYER":
                return Application.objects.filter(job__employer=user).select_related("job", "seeker").order_by('-created_at')
            return Application.objects.filter(seeker=user).select_related("job", "seeker").order_by('-created_at')
        return Application.objects.none()

    def get_permissions(self):
        if self.action == "create":
            return [IsJobSeeker()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(seeker=self.request.user)

    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        application = self.get_object()
        user = request.user
        new_status = request.data.get('status')
        
        if user.is_authenticated and user.role == 'EMPLOYER' and application.job.employer == user:
            application.status = new_status
            application.save()
            return Response({'status': f'Application status updated to {new_status}'})
        
        return Response({'detail': 'You do not have permission to perform this action.'}, status=status.HTTP_403_FORBIDDEN)
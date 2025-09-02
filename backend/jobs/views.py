from rest_framework import viewsets, permissions, decorators, response, status
from .models import Job
from .serializers import JobSerializer
from accounts.permissions import IsEmployer, IsOwnerEmployer

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all().order_by('-created_at')
    serializer_class = JobSerializer
    search_fields = ["title", "description", "requirements", "location", "job_type"]
    ordering_fields = ["created_at"]
    
    def get_queryset(self):
        user = self.request.user
        # If the user is an authenticated employer, filter by their jobs.
        # Otherwise, return all jobs for job seekers and anonymous users.
        if user.is_authenticated and user.role == 'EMPLOYER':
            return self.queryset.filter(employer=user)
        return self.queryset

    def perform_create(self, serializer):
        return serializer.save(employer=self.request.user)

    def get_permissions(self):
        if self.action in ["create"]:
            return [IsEmployer()]
        if self.action in ["update", "partial_update", "destroy", "mark_filled"]:
            return [IsOwnerEmployer()]
        return [permissions.IsAuthenticatedOrReadOnly()]

    @decorators.action(detail=True, methods=["post"])
    def mark_filled(self, request, pk=None):
        job = self.get_object()
        if job.employer_id != request.user.id:
            return response.Response(status=status.HTTP_403_FORBIDDEN)
        job.is_filled = True
        job.save()
        return response.Response({"status": "filled"})
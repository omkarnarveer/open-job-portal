from rest_framework import viewsets, permissions, decorators, response, status
from .models import Job
from .serializers import JobSerializer
from .permissions import IsEmployer, IsOwnerEmployer

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    search_fields = ["title", "description", "requirements", "location", "job_type"]
    ordering_fields = ["created_at"]

    def perform_create(self, serializer):
        return serializer.save(employer=self.request.user)

    def get_permissions(self):
        if self.action in ["create"]:
            return [IsEmployer()]
        if self.action in ["update", "partial_update", "destroy"]:
            return [IsOwnerEmployer()]
        return super().get_permissions()

    @decorators.action(detail=True, methods=["post"])
    def mark_filled(self, request, pk=None):
        job = self.get_object()
        if job.employer_id != request.user.id:
            return response.Response(status=status.HTTP_403_FORBIDDEN)
        job.is_filled = True
        job.save()
        return response.Response({"status": "filled"})
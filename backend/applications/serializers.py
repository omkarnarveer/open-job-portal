from rest_framework import serializers
from .models import Application

class ApplicationSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source="job.title", read_only=True)

    class Meta:
        model = Application
        fields = ["id", "job", "job_title", "seeker", "cover_letter", "resume", "status", "created_at"]
        read_only_fields = ["seeker", "status", "created_at"]
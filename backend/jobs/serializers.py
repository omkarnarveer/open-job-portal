from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    employer_name = serializers.CharField(source="employer.username", read_only=True)

    class Meta:
        model = Job
        fields = ["id", "employer", "employer_name", "title", "description", "requirements", "location", "job_type", "application_deadline", "is_filled", "created_at"]
        read_only_fields = ["employer", "created_at"]
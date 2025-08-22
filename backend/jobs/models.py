from django.db import models
from django.conf import settings

class Job(models.Model):
    FULL_TIME = "FULL_TIME"
    PART_TIME = "PART_TIME"
    CONTRACT = "CONTRACT"
    INTERNSHIP = "INTERNSHIP"
    JOB_TYPES = [(FULL_TIME, "Full-time"), (PART_TIME, "Part-time"), (CONTRACT, "Contract"), (INTERNSHIP, "Internship")]

    employer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="jobs")
    title = models.CharField(max_length=255)
    description = models.TextField()
    requirements = models.TextField(blank=True)
    location = models.CharField(max_length=255)
    job_type = models.CharField(max_length=20, choices=JOB_TYPES, default=FULL_TIME)
    application_deadline = models.DateField(null=True, blank=True)
    is_filled = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title
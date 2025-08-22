from django.db import models
from django.conf import settings
from jobs.models import Job

class Application(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="applications")
    seeker = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="applications")
    cover_letter = models.TextField(blank=True)
    resume = models.FileField(upload_to="resumes/", blank=True, null=True)
    status = models.CharField(max_length=20, default="SUBMITTED")  # e.g., SUBMITTED, REVIEWED, REJECTED, ACCEPTED
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("job", "seeker")

    def __str__(self):
        return f"{self.seeker} -> {self.job}"
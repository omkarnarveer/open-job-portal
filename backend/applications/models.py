from django.db import models
from django.conf import settings

class Application(models.Model):
    class Status(models.TextChoices):
        SUBMITTED = "SUBMITTED", "Submitted"
        REVIEWED = "REVIEWED", "Reviewed"
        ACCEPTED = "ACCEPTED", "Accepted"
        REJECTED = "REJECTED", "Rejected"

    job = models.ForeignKey('jobs.Job', on_delete=models.CASCADE, related_name='applications')
    seeker = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='applications')
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.SUBMITTED)
    cover_letter = models.TextField()
    resume = models.FileField(upload_to='resumes/')
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # A seeker can only apply to a specific job once
        unique_together = ('job', 'seeker')

    def __str__(self):
        return f"Application for {self.job.title} by {self.seeker.username}"
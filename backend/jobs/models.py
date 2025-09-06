from django.db import models
from django.conf import settings

class Job(models.Model):
    class JobType(models.TextChoices):
        FULL_TIME = "FULL_TIME", "Full-time"
        PART_TIME = "PART_TIME", "Part-time"
        CONTRACT = "CONTRACT", "Contract"
        INTERNSHIP = "INTERNSHIP", "Internship"

    employer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='jobs')
    title = models.CharField(max_length=255)
    company_name = models.CharField(max_length=255, blank=True)
    description = models.TextField()
    location = models.CharField(max_length=255)
    salary_ctc = models.CharField(max_length=50, blank=True, verbose_name="Offered CTC (LPA)")
    openings = models.PositiveIntegerField(default=1)
    job_type = models.CharField(max_length=20, choices=JobType.choices)
    is_filled = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    requirements = models.TextField(blank=True)

    def __str__(self):
        return f"{self.title} at {self.employer.username}"
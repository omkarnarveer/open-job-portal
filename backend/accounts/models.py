from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    JOB_SEEKER = "JOB_SEEKER"
    EMPLOYER = "EMPLOYER"
    ROLE_CHOICES = [(JOB_SEEKER, "Job Seeker"), (EMPLOYER, "Employer")]

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default=JOB_SEEKER)
    phone = models.CharField(max_length=20, blank=True)
    company_name = models.CharField(max_length=255, blank=True)
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.role})"
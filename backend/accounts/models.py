from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    class Role(models.TextChoices):
        JOB_SEEKER = "JOB_SEEKER", "Job Seeker"
        EMPLOYER = "EMPLOYER", "Employer"
    
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=50, choices=Role.choices)
    phone_number = models.CharField(max_length=20, blank=True)
    company_name = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.username} ({self.role})"
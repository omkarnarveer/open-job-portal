# In your backend's urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('api/jobs/', views.job_list, name='job_list'),
   
]

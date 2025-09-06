from rest_framework import serializers
from .models import Application

class ApplicationSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source='job.title', read_only=True)
    seeker_username = serializers.CharField(source='seeker.username', read_only=True)
    
    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ('seeker',)
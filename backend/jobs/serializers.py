from rest_framework import serializers
from .models import Job
from accounts.serializers import UserProfileSerializer

class JobSerializer(serializers.ModelSerializer):
    # Show employer's username instead of just their ID
    employer_username = serializers.CharField(source='employer.username', read_only=True)

    class Meta:
        model = Job
        fields = '__all__'
        read_only_fields = ('employer',)
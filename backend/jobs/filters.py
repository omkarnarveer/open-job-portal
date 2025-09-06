import django_filters
from django.db.models import Q
from .models import Job

class JobFilter(django_filters.FilterSet):
    # This field will accept a text query and use our custom search method
    search = django_filters.CharFilter(method='filter_search', label="Search by title or location")

    class Meta:
        model = Job
        # We only need an exact match filter for job_type, 
        # as the 'search' field already handles location.
        fields = ['job_type']

    def filter_search(self, queryset, name, value):
        # This custom method searches case-insensitively in both title and location
        return queryset.filter(
            Q(title__icontains=value) | Q(location__icontains=value)
        )
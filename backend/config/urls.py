# config/urls.py

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from jobs.views import JobViewSet
from applications.views import ApplicationViewSet
from accounts.views import UserRegistrationView, UserProfileView 
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

router = DefaultRouter()
router.register(r"jobs", JobViewSet, basename="job")
router.register(r"applications", ApplicationViewSet, basename="application")

urlpatterns = [
    path('admin/', admin.site.urls),

    # API v1 routes
    # You can also use include('accounts.urls') as provided in my full backend answer.
    # This direct import is also fine, but `include` is often cleaner.
    path('api/v1/auth/register/', UserRegistrationView.as_view(), name='user-register'),
    path('api/v1/auth/me/', UserProfileView.as_view(), name='user-profile'),
    
    # Include other app URLs
    path('api/v1/jobs/', include('jobs.urls')),
    path('api/v1/applications/', include('applications.urls')),

    # JWT Authentication endpoints
    path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # API Schema and Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
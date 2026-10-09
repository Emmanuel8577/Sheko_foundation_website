from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CampaignViewSet,
    TeamMemberViewSet,
    TeamMemberListAPIView,
    VolunteerViewSet,
    ContactMessageViewSet,
)

# Register ViewSets with DRF Router
router = DefaultRouter()
router.register(r'campaigns', CampaignViewSet, basename='campaign')
router.register(r'team', TeamMemberViewSet, basename='teammember')
router.register(r'volunteers', VolunteerViewSet, basename='volunteer')
router.register(r'contact-messages', ContactMessageViewSet, basename='contactmessage')

urlpatterns = [
    # Router endpoints (e.g., /api/v1/team/, /api/v1/campaigns/)
    path('', include(router.urls)),
    # Standalone view endpoint
    path('team-members/', TeamMemberListAPIView.as_view(), name='team-member-list'),
]
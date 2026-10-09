from rest_framework import viewsets, generics, permissions
from .models import Campaign, TeamMember, Volunteer, ContactMessage
from .serializers import (
    CampaignSerializer,
    TeamMemberSerializer,
    VolunteerSerializer,
    ContactMessageSerializer,
)

# --- ViewSets & Views ---

class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all().order_by('-created_at')
    serializer_class = CampaignSerializer
    lookup_field = 'slug'

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


class TeamMemberViewSet(viewsets.ModelViewSet):
    """Provides Full CRUD (List, Create, Retrieve, Update, Destroy) for Django Admin/API."""
    queryset = TeamMember.objects.all().order_by('order', 'id')
    serializer_class = TeamMemberSerializer
    permission_classes = [permissions.AllowAny]


class TeamMemberListAPIView(generics.ListAPIView):
    queryset = TeamMember.objects.all().order_by('order', 'id')
    serializer_class = TeamMemberSerializer
    permission_classes = [permissions.AllowAny]


class VolunteerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows volunteers to be viewed or managed.
    """
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
from rest_framework import serializers
from .models import Campaign, CampaignImage, TeamMember, Volunteer, ContactMessage


class CampaignImageSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = CampaignImage
        fields = ['id', 'url', 'caption', 'order']

    def get_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None


class CampaignSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    gallery = CampaignImageSerializer(source='gallery_images', many=True, read_only=True)
    social_links = serializers.SerializerMethodField()
    key_objectives = serializers.SerializerMethodField()

    class Meta:
        model = Campaign
        fields = [
            'id', 'title', 'slug', 'category', 'status', 'date', 'location',
            'beneficiaries_count', 'goal', 'raised', 'image', 'short_description',
            'full_story', 'key_objectives', 'social_links', 'gallery', 'created_at'
        ]

    def get_key_objectives(self, obj):
        if not obj.key_objectives:
            return []
        lines = obj.key_objectives.replace(';', '\n').splitlines()
        return [line.strip('-* ').strip() for line in lines if line.strip()]

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None

    def get_social_links(self, obj):
        return {
            "youtube": obj.youtube_link,
            "instagram": obj.instagram_link,
            "facebook": obj.facebook_link,
        }


class TeamMemberSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = TeamMember
        fields = ['id', 'full_name', 'role', 'bio', 'image', 'email', 'phone', 'order', 'created_at']

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None


class VolunteerSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Volunteer
        fields = ['id', 'full_name', 'email', 'phone', 'skills', 'quote', 'image', 'is_approved', 'created_at']

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'
import uuid
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Role(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True, help_text="e.g. Head of Programs, HR Manager, Communications")
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.ForeignKey(
        Role, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='users',
        help_text="Select the operational role for this staff member."
    )

    def __str__(self):
        role_name = self.role.name if self.role else "No Role"
        return f"{self.user.username} - {role_name}"


@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.get_or_create(user=instance)
    else:
        if hasattr(instance, 'profile'):
            instance.profile.save()


class CategoryChoice(models.TextChoices):
    HEALTHCARE = 'Healthcare', 'Healthcare'
    EDUCATION = 'Education', 'Education'
    ECONOMIC_EMPOWERMENT = 'Economic Empowerment', 'Economic Empowerment'
    RELIEF_AID = 'Relief Aid', 'Relief Aid'


class StatusChoice(models.TextChoices):
    ACTIVE = 'Active', 'Active'
    COMPLETED = 'Completed', 'Completed'


class Campaign(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)
    category = models.CharField(max_length=50, choices=CategoryChoice.choices)
    status = models.CharField(max_length=20, choices=StatusChoice.choices, default=StatusChoice.ACTIVE)
    date = models.CharField(max_length=100, help_text="e.g. March 2025")
    location = models.CharField(max_length=255)
    beneficiaries_count = models.PositiveIntegerField(default=0)
    goal = models.DecimalField(max_digits=12, decimal_places=2, help_text="Goal amount in NGN (₦)")
    raised = models.DecimalField(max_digits=12, decimal_places=2, default=0.00, help_text="Amount raised in NGN (₦)")
    image = models.ImageField(upload_to='campaigns/')
    short_description = models.TextField()
    full_story = models.TextField()
    
    # Plain text objectives field (one per line)
    key_objectives = models.TextField(
        blank=True,
        null=True,
        help_text="Enter key objectives (one per line)."
    )

    # Optional social media video links
    youtube_link = models.URLField(blank=True, null=True)
    instagram_link = models.URLField(blank=True, null=True)
    facebook_link = models.URLField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class CampaignImage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    campaign = models.ForeignKey(Campaign, related_name='gallery_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='campaigns/gallery/')
    caption = models.CharField(max_length=255, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'created_at']

    def __str__(self):
        return f"Gallery image for {self.campaign.title}"


class TeamMember(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField(max_length=150)
    role = models.CharField(max_length=150)
    bio = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='team/')
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    order = models.PositiveIntegerField(default=0, help_text="Display order in frontend")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'created_at']

    def __str__(self):
        return f"{self.full_name} ({self.role})"


class Volunteer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    skills = models.CharField(max_length=255, help_text="Skills or area of expertise")
    quote = models.TextField(
        blank=True, 
        null=True, 
        help_text="Quote or motivation on why you want to volunteer"
    )
    image = models.ImageField(upload_to="volunteers/", blank=True, null=True)
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.full_name} - {self.email}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.subject} - {self.name} ({self.email})"
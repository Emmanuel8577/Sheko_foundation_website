from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from unfold.admin import ModelAdmin, TabularInline, StackedInline
from unfold.forms import UserChangeForm, UserCreationForm

from .models import (
    Campaign, 
    CampaignImage, 
    TeamMember, 
    Volunteer, 
    ContactMessage, 
    UserProfile, 
    Role
)

# Professional Avatar Badge + Styled Foundation Name for Admin Header
admin.site.site_header = mark_safe(
    '<div style="display: flex; align-items: center; gap: 10px;">'
    '<div style="width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, #8C76E5, #6366F1); color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 16px; box-shadow: 0 2px 6px rgba(140, 118, 229, 0.4);">'
    'SKF'
    '</div>'
    '<span style="font-weight: 800; font-size: 18px; letter-spacing: -0.02em; color: #1E293B;">Sheko Kerjen Foundation</span>'
    '</div>'
)

admin.site.site_title = "Sheko Kerjen Dashboard"
admin.site.index_title = "Sheko Kerjen Platform Management & Moderation"


# ----------------------------------------------------------------------
# Role Management (Create/Manage Custom Roles)
# ----------------------------------------------------------------------

@admin.register(Role)
class RoleAdmin(ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)

    def has_module_permission(self, request):
        return request.user.is_superuser

    def has_add_permission(self, request):
        return request.user.is_superuser

    def has_change_permission(self, request, obj=None):
        return request.user.is_superuser

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser


# ----------------------------------------------------------------------
# User Profile & RBAC Admin Configuration
# ----------------------------------------------------------------------

class UserProfileInline(StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Assigned Staff Role'
    fk_name = 'user'
    extra = 1


# Unregister default and re-register with Unfold
admin.site.unregister(User)


@admin.register(User)
class UserAdmin(BaseUserAdmin, ModelAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    inlines = (UserProfileInline,)
    list_display = ('username', 'email', 'first_name', 'last_name', 'get_role', 'is_staff', 'is_superuser')
    list_filter = ('is_staff', 'is_superuser', 'profile__role')

    def get_role(self, obj):
        if hasattr(obj, 'profile') and obj.profile.role:
            return format_html(
                '<span style="background-color: #f3e8ff; color: #7e22ce; padding: 3px 8px; border-radius: 12px; font-weight: 600; font-size: 11px;">{}</span>',
                obj.profile.role.name
            )
        return "No Role Assigned"
    get_role.short_description = "Assigned Role"

    def has_add_permission(self, request):
        return request.user.is_superuser

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser


# ----------------------------------------------------------------------
# Helper helper for dynamic role checks in other models
# ----------------------------------------------------------------------
def user_has_role(user, role_name):
    if user.is_superuser:
        return True
    try:
        return user.profile.role and user.profile.role.name.lower() == role_name.lower()
    except Exception:
        return False


# ----------------------------------------------------------------------
# Campaign / Program Management
# ----------------------------------------------------------------------

class CampaignImageInline(TabularInline):
    model = CampaignImage
    extra = 1
    fields = ('image', 'caption', 'order')


class CampaignAdminForm(forms.ModelForm):
    class Meta:
        model = Campaign
        fields = '__all__'
        widgets = {
            'key_objectives': forms.Textarea(
                attrs={
                    'rows': 4,
                    'placeholder': "Provide clean water access\nBuild local healthcare infrastructure\nDistribute educational kits",
                }
            ),
        }


@admin.register(Campaign)
class CampaignAdmin(ModelAdmin):
    form = CampaignAdminForm
    list_display = (
        'image_thumbnail',
        'title',
        'category_badge',
        'status',
        'goal',
        'raised',
        'beneficiaries_count',
        'date'
    )
    list_filter = ('category', 'status')
    search_fields = ('title', 'location', 'short_description')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('status', 'goal', 'raised', 'beneficiaries_count', 'date')
    inlines = [CampaignImageInline]

    # 👇 Add this line to force Unfold to render the save/update buttons on change forms
    change_form_template = "admin/change_form.html"

    def has_module_permission(self, request):
        if request.user.is_superuser:
            return True
        return user_has_role(request.user, "Head of Programs") or user_has_role(request.user, "Main Admin")

    def has_add_permission(self, request):
        return self.has_module_permission(request)

    def has_change_permission(self, request, obj=None):
        return self.has_module_permission(request)

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser

    def image_thumbnail(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="width: 44px; height: 34px; border-radius: 6px; object-fit: cover;" />',
                obj.image.url
            )
        return "No Cover"
    image_thumbnail.short_description = "Cover"

    def category_badge(self, obj):
        return format_html(
            '<span style="background-color: #f3e8ff; color: #7e22ce; padding: 3px 8px; border-radius: 12px; font-weight: 600; font-size: 11px;">{}</span>',
            obj.category
        )
    category_badge.short_description = "Category"


# ----------------------------------------------------------------------
# Team Members Management
# ----------------------------------------------------------------------

@admin.register(TeamMember)
class TeamMemberAdmin(ModelAdmin):
    list_display = ('avatar', 'full_name', 'role', 'phone', 'email', 'order')
    list_editable = ('order',)
    search_fields = ('full_name', 'role', 'email')
    readonly_fields = ('avatar_preview', 'created_at')

    def has_module_permission(self, request):
        if request.user.is_superuser:
            return True
        return user_has_role(request.user, "HR Manager") or user_has_role(request.user, "Main Admin")

    def has_add_permission(self, request):
        return self.has_module_permission(request)

    def has_change_permission(self, request, obj=None):
        return self.has_module_permission(request)

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser

    def avatar(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover;" />',
                obj.image.url
            )
        return mark_safe('<span style="color: #94a3b8;">—</span>')
    avatar.short_description = "Photo"

    def avatar_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover;" />',
                obj.image.url
            )
        return "No Photo Uploaded"


# ----------------------------------------------------------------------
# Volunteers Management
# ----------------------------------------------------------------------

@admin.register(Volunteer)
class VolunteerAdmin(ModelAdmin):
    list_display = ('avatar', 'full_name', 'email', 'phone', 'skills_tags', 'is_approved', 'created_at')
    list_filter = ('is_approved', 'created_at')
    list_editable = ('is_approved',)
    search_fields = ('full_name', 'email', 'skills', 'quote')
    actions = ['approve_volunteers', 'reject_volunteers']

    def has_module_permission(self, request):
        if request.user.is_superuser:
            return True
        return user_has_role(request.user, "HR Manager") or user_has_role(request.user, "Main Admin")

    def has_add_permission(self, request):
        return self.has_module_permission(request)

    def has_change_permission(self, request, obj=None):
        return self.has_module_permission(request)

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser

    def avatar(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover;" />',
                obj.image.url
            )
        return mark_safe('<span style="color: #94a3b8; font-size: 11px;">No Photo</span>')
    avatar.short_description = "Photo"

    def avatar_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width: 160px; max-height: 160px; border-radius: 12px; object-fit: cover;" />',
                obj.image.url
            )
        return "No Photo Uploaded"

    def skills_tags(self, obj):
        if not obj.skills:
            return mark_safe('<span style="color: #94a3b8;">—</span>')
        skills_list = [s.strip() for s in obj.skills.split(',')]
        badges = "".join([
            f'<span style="background-color: #f1f5f9; color: #334155; padding: 2px 6px; border-radius: 4px; margin-right: 4px; font-size: 11px;">{skill}</span>'
            for skill in skills_list
        ])
        return mark_safe(badges)
    skills_tags.short_description = "Skills"

    @admin.action(description="Approve selected volunteers")
    def approve_volunteers(self, request, queryset):
        queryset.update(is_approved=True)

    @admin.action(description="Unapprove selected volunteers")
    def reject_volunteers(self, request, queryset):
        queryset.update(is_approved=False)


# ----------------------------------------------------------------------
# Contact Messages Management
# ----------------------------------------------------------------------

@admin.register(ContactMessage)
class ContactMessageAdmin(ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at', 'is_read')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    list_editable = ('is_read',)
    readonly_fields = ('name', 'email', 'subject', 'message', 'created_at') # Optional: makes messages read-only in admin so they aren't accidentally modified
    change_form_template = "admin/change_form.html"

    def has_module_permission(self, request):
        if request.user.is_superuser:
            return True
        return user_has_role(request.user, "Main Admin") or user_has_role(request.user, "Head of Programs")
    
    def has_add_permission(self, request):
        return request.user.is_superuser

    def has_change_permission(self, request, obj=None):
        return self.has_module_permission(request)

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser

    def read_badge(self, obj):
        if obj.is_read:
            return format_html(
                '<span style="background-color: #f1f5f9; color: #475569; padding: 3px 8px; border-radius: 10px; font-weight: 600; font-size: 11px;">Read</span>'
            )
        return format_html(
            '<span style="background-color: #fef08a; color: #854d0e; padding: 3px 8px; border-radius: 10px; font-weight: 600; font-size: 11px;">New Message</span>'
        )
    read_badge.short_description = "Badge"
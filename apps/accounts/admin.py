from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import User, OTP, PasswordResetToken


class UserAdmin(BaseUserAdmin):
    ordering = ["email"]
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = [
        "first_name",
        "last_name",
        "email",
        "mobile",
        "is_staff",
        "is_active",
        "created_at",
        "updated_at",
    ]
    list_display_links = list_display
    list_filter = [
        "email",
        "mobile",
        "first_name",
        "last_name",
        "is_active",
    ]
    fieldsets = (
        (
            _("Login Credentials"),
            {
                "fields": (
                    "email",
                    "password",
                )
            },
        ),
        (
            _("Personal Information"),
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "mobile",
                    "is_mobile_verified"
                )
            },
        ),
        (
            _("Permissions and Groups"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        (_("Important Dates"), {"fields": ("last_login",)}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2", "is_staff", "is_active",),
            },
        ),
    )
    search_fields = ["email", "mobile"]


admin.site.register(User, UserAdmin)
# admin.site.register(OTP)
# admin.site.register(PasswordResetToken)

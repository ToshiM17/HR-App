from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Group

from django.utils.translation import gettext_lazy as _

# Register your models here.

class CustomUserAdmin(UserAdmin):
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (_("Personal info"), {"fields": ("first_name", "last_name", "email")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "group_name",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("username", "password1", "password2"),
            },
        ),
    )

    def save_related(self, request, form, formsets, change):
        super(CustomUserAdmin, self).save_related(request, form, formsets, change)
        group = Group.objects.get(name=form.instance.group_name)
        form.instance.groups.set([group])

admin.site.register(User, CustomUserAdmin)
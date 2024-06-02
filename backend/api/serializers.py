from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    group_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["username", "email", "first_name", "last_name", "is_superuser", "is_staff", "is_active", "group_name"]

    def get_group_name(self, obj):
        return getattr(User.objects.get(username=obj.username).groups.first(), "name", "users")
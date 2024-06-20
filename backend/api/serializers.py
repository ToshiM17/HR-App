from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

# from django.contrib.auth.models import User

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email", "first_name", "last_name", "is_superuser", "is_staff", "is_active", "group_name"]
        extra_kwargs = {
                'id': {'read_only': True},
                'password': {'write_only': True, "required": False},
        }
    
    def create(self, validated_data):
        try:
            user = User.objects.create_user(
                username=validated_data['username'],
                email=validated_data['email'],
                password=validated_data['password'],
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name'],
                is_superuser=validated_data['is_superuser'],
                is_staff=validated_data['is_staff'],
                group_name=validated_data['group_name']
            )
        except Exception as e:
            error = {'error': ",".join(e.args)}
            raise serializers.ValidationError(error)

        return user

    def update(self, instance, validated_data):
        user = User.objects.get(username=validated_data['username'])

        if "password" in validated_data:
            user.set_password(validated_data['password'])

        user.email=validated_data['email']
        user.first_name=validated_data['first_name']
        user.last_name=validated_data['last_name']
        user.is_superuser=validated_data['is_superuser']
        user.is_staff=validated_data['is_staff']
        user.group_name=validated_data['group_name']

        user.save()

        return user
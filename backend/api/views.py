from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth.models import User

from . serializers import UserSerializer

# Create your views here.

class get_users(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, authentication, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer

from . serializers import UserSerializer

# Create your views here.

class GetUsersView(APIView):
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)

        return Response(serializer.data)
    
class TestTokenView(APIView):
    authentication_classes = [authentication.SessionAuthentication, authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        return Response(f"Token passed for: {request.user.username}")
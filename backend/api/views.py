from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import status, authentication, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from datetime import datetime, timezone

from . serializers import UserSerializer
from . authentication import ExpiringTokenAuthentication

# Create your views here.


class ObtainExpiringAuthToken(ObtainAuthToken):
    permission_classes = [~permissions.IsAuthenticated]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # if old token exists delete it
            Token.objects.filter(user=serializer.validated_data['user']).delete()
            token = Token.objects.create(user=serializer.validated_data['user'])

            return Response({'token': token.key})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetUsersView(APIView):
    authentication_classes = [authentication.SessionAuthentication, ExpiringTokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)

        return Response(serializer.data)
    
class TestTokenView(APIView):
    authentication_classes = [authentication.SessionAuthentication, ExpiringTokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        return Response(f"Token passed for: {request.user.username}")
    
class DeleteTokenView(APIView):
    authentication_classes = [authentication.SessionAuthentication, ExpiringTokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        Token.objects.filter(user=request.user).delete()
        return Response(f"Token deleted for: {request.user.username}")

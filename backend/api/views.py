from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import status, authentication, permissions
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from datetime import datetime, timezone

from . serializers import UserSerializer
from . authentication import ExpiringTokenAuthentication, token_expired

User = get_user_model()

# Create your views here.

def get_group_name(username: str):
    return getattr(User.objects.get(username=username).groups.first(), "name", "users")


class ObtainExpiringAuthToken(ObtainAuthToken):
    permission_classes = [~permissions.IsAuthenticated]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # if token exists and didn't expire get the token
            if token_expired(Token.objects.filter(user=serializer.validated_data['user']).first()):
                token, created = Token.objects.update_or_create(user=serializer.validated_data['user'])
                token.save()
            else:
                token = Token.objects.get(user=serializer.validated_data['user'])

            response = {
                'token': token.key,
                'group': get_group_name(serializer.validated_data['user']),
            }

            return Response(response)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetUsersView(APIView):
    authentication_classes = [authentication.SessionAuthentication, ExpiringTokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)

        return Response(serializer.data)
    
class CreateUserView(CreateAPIView):
    authentication_classes = [authentication.SessionAuthentication, ExpiringTokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    model = User
    serializer_class = UserSerializer
    
class TestTokenView(APIView):
    authentication_classes = [authentication.SessionAuthentication, ExpiringTokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        return Response({'message': f"Token passed for {request.user.username}"})
    
class DeleteTokenView(APIView):
    authentication_classes = [authentication.SessionAuthentication, ExpiringTokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        Token.objects.filter(user=request.user).delete()
        return Response({'message': f"Token deleted for {request.user.username}"})

from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

class CreateUserView(generics.CreateAPIView): #handles creating new user or object for us.
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_class = [AllowAny] # anyone can use to create a new user.

from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import NoteSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

class NoteListCreate(generics.ListCreateAPIView):
  queryset = Note.objects.all()
  serializer_class = NoteSerializer
  permission_classes = [IsAuthenticated] # only authenticated users can access.

  def get_queryset(self):
    user = self.request.user
    return Note.objects.filter(author=user) # filter notes to only those created by the logged-in user.

  def perform_create(self, serializer):
    if serializer.is_valid():
      serializer.save(author=self.request.user) # set the author to the logged-in user.
    else:
      print("Serializer is not valid", serializer.errors)

class CreateUserView(generics.CreateAPIView): #handles creating new user or object for us.
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_class = [AllowAny] # anyone can use to create a new user.

class NoteDelete(generics.DestroyAPIView):
  serializer_class = NoteSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    return Note.objects.filter(author=user) # ensure users can only delete their own notes. 

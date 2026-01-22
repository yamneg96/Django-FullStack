from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = Userfields = ['id', 'username', 'password']
    extra_kwargs = {'password': {'write_only': True}}#No one can read the password.

  def create(seld, validated_data):
    user = User.objects.create_user(**validated_data)#After validated on the above it registers here.
    return user
  
class NoteSerializer(serializers.ModelSerializer):
  author = UserSerializer(read_only=True)#To show the author details in the note.

  class Meta:
    model = Note
    fields = ['id', 'title', 'content', 'created_at', 'updated_at', 'author']
    extra_kwargs = {'author':{'read_only': True},'created_at': {'read_only': True}, 'updated_at': {'read_only': True}}
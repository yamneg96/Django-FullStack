from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = Userfields = ['id', 'username', 'password']
    extra_kwargs = {'password': {'write_only': True}}#No one can read the password.

  def create(seld, validated_data):
    user = User.objects.create_user(**validated_data)#After validated on the above it registers here.
    return user
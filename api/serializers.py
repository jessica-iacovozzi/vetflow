from rest_framework import serializers
from .models import Pet, Questionnaire

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = ['id', 'name', 'species', 'breed', 'date_of_birth', 
                 'owner', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

class QuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questionnaire
        fields = ['id', 'title', 'description', 'status', 'pet', 
                 'created_by', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
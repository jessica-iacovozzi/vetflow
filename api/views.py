from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Pet, Questionnaire
from .serializers import PetSerializer, QuestionnaireSerializer

class HealthCheckView(APIView):
    """
    Basic health check endpoint to verify API is running
    """
    def get(self, request):
        return Response({
            'status': 'healthy',
            'version': '1.0.0'
        }, status=status.HTTP_200_OK)

class PetViewSet(viewsets.ModelViewSet):
    """
    CRUD operations for pets
    """
    queryset = Pet.objects.all()
    serializer_class = PetSerializer

class QuestionnaireViewSet(viewsets.ModelViewSet):
    """
    CRUD operations for questionnaires
    """
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    HealthCheckView,
    PetViewSet,
    QuestionnaireViewSet,
)

router = DefaultRouter()
router.register(r'pets', PetViewSet)
router.register(r'questionnaires', QuestionnaireViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('health/', HealthCheckView.as_view(), name='health-check'),
]
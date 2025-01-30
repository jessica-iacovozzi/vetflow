from django.db import models
from users.models import User

class Pet(models.Model):
    SPECIES_CHOICES = [
        ('DOG', 'Dog'),
        ('CAT', 'Cat'),
        ('OTHER', 'Other')
    ]
    
    name = models.CharField(max_length=100)
    species = models.CharField(max_length=5, choices=SPECIES_CHOICES)
    breed = models.CharField(max_length=100, blank=True)
    date_of_birth = models.DateField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pets')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.get_species_display()})"

class Questionnaire(models.Model):
    STATUS_CHOICES = [
        ('DRAFT', 'Draft'),
        ('PUBLISHED', 'Published'),
        ('ARCHIVED', 'Archived')
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='DRAFT')
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name='questionnaires')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_questionnaires')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
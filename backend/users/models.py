from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Modelo personalizado de usuario extendiendo AbstractUser
    """
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    ultimo_grado_estudios = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(unique=True)
    estado = models.CharField(max_length=50, blank=True, null=True)
    
    # Campos adicionales para mejor manejo
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'nombres', 'apellidos']
    
    class Meta:
        db_table = 'users'
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
    
    def __str__(self):
        return f"{self.nombres} {self.apellidos} ({self.email})"
    
    def get_full_name(self):
        return f"{self.nombres} {self.apellidos}"

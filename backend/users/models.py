from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """
    Modelo de usuario personalizado que extiende AbstractUser
    """
    # Estados de México
    ESTADOS_CHOICES = [
        ('aguascalientes', 'Aguascalientes'),
        ('baja_california', 'Baja California'),
        ('baja_california_sur', 'Baja California Sur'),
        ('campeche', 'Campeche'),
        ('coahuila', 'Coahuila'),
        ('colima', 'Colima'),
        ('chiapas', 'Chiapas'),
        ('chihuahua', 'Chihuahua'),
        ('cdmx', 'Ciudad de México'),
        ('durango', 'Durango'),
        ('guanajuato', 'Guanajuato'),
        ('guerrero', 'Guerrero'),
        ('hidalgo', 'Hidalgo'),
        ('jalisco', 'Jalisco'),
        ('mexico', 'Estado de México'),
        ('michoacan', 'Michoacán'),
        ('morelos', 'Morelos'),
        ('nayarit', 'Nayarit'),
        ('nuevo_leon', 'Nuevo León'),
        ('oaxaca', 'Oaxaca'),
        ('puebla', 'Puebla'),
        ('queretaro', 'Querétaro'),
        ('quintana_roo', 'Quintana Roo'),
        ('san_luis_potosi', 'San Luis Potosí'),
        ('sinaloa', 'Sinaloa'),
        ('sonora', 'Sonora'),
        ('tabasco', 'Tabasco'),
        ('tamaulipas', 'Tamaulipas'),
        ('tlaxcala', 'Tlaxcala'),
        ('veracruz', 'Veracruz'),
        ('yucatan', 'Yucatán'),
        ('zacatecas', 'Zacatecas'),
    ]

    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    ultimo_grado_estudios = models.CharField(max_length=100)
    estado = models.CharField(max_length=50, choices=ESTADOS_CHOICES, help_text="Estado de la República Mexicana")

    # Los campos email, username y password ya están incluidos en AbstractUser
    # AbstractUser ya incluye is_active, date_joined, etc.

    def __str__(self):
        return f"{self.nombres} {self.apellidos}"

    class Meta:
        db_table = "users"

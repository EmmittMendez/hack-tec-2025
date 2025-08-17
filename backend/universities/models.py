from django.db import models


class University(models.Model):
    """
    Modelo para las universidades
    """
    TIPO_CHOICES = [
        ('publica', 'Pública'),
        ('privada', 'Privada'),
    ]
    
    nombre = models.CharField(max_length=255)
    estado = models.CharField(max_length=100)
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    descripcion = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'universities'
        verbose_name = 'Universidad'
        verbose_name_plural = 'Universidades'
    
    def __str__(self):
        return self.nombre


class Program(models.Model):
    """
    Modelo para los programas académicos de las universidades
    """
    universidad = models.ForeignKey(University, on_delete=models.CASCADE, related_name='programs')
    nombre = models.CharField(max_length=255)
    area = models.CharField(max_length=100)
    plan_estudios_url = models.URLField(blank=True, null=True, help_text="Link o PDF del plan de estudios")
    convocatoria_url = models.URLField(blank=True, null=True)
    beca_disponible = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'programs'
        verbose_name = 'Programa'
        verbose_name_plural = 'Programas'
    
    def __str__(self):
        return f"{self.universidad.nombre} - {self.nombre}"


class Scholarship(models.Model):
    """
    Modelo para las becas disponibles en las universidades
    """
    TIPO_CHOICES = [
        ('academica', 'Académica'),
        ('socioeconomica', 'Socioeconómica'),
        ('deportiva', 'Deportiva'),
        ('interna', 'Interna'),
    ]
    
    universidad = models.ForeignKey(University, on_delete=models.CASCADE, related_name='scholarships')
    nombre = models.CharField(max_length=255)
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    requisitos = models.TextField()
    link = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'scholarships'
        verbose_name = 'Beca'
        verbose_name_plural = 'Becas'
    
    def __str__(self):
        return f"{self.universidad.nombre} - {self.nombre}"

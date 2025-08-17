from django.db import models


class University(models.Model):
    """
    Modelo para las universidades
    """

    TIPO_CHOICES = [
        ("publica", "Pública"),
        ("privada", "Privada"),
    ]

    nombre = models.CharField(max_length=255)
    estado = models.CharField(max_length=100)
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre

    class Meta:
        db_table = "universities"


class Program(models.Model):
    """
    Modelo para los programas académicos
    """

    universidad = models.ForeignKey(
        University, on_delete=models.CASCADE, related_name="programs"
    )
    nombre = models.CharField(max_length=255)
    area = models.CharField(max_length=100)
    plan_estudios_url = models.URLField(blank=True, null=True)
    convocatoria_url = models.URLField(blank=True, null=True)
    beca_disponible = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.universidad.nombre} - {self.nombre}"

    class Meta:
        db_table = "programs"


class Scholarship(models.Model):
    """
    Modelo para las becas
    """

    TIPO_CHOICES = [
        ("academica", "Académica"),
        ("socioeconomica", "Socioeconómica"),
        ("deportiva", "Deportiva"),
        ("interna", "Interna"),
    ]

    universidad = models.ForeignKey(
        University, on_delete=models.CASCADE, related_name="scholarships"
    )
    nombre = models.CharField(max_length=255)
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    requisitos = models.TextField()
    link = models.URLField()

    def __str__(self):
        return f"{self.universidad.nombre} - {self.nombre}"

    class Meta:
        db_table = "scholarships"

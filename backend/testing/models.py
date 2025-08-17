from django.db import models
from django.conf import settings


class VocationalTest(models.Model):
    """
    Modelo para los tests vocacionales
    """

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    resultado = models.CharField(max_length=255)
    puntaje = models.IntegerField()

    def __str__(self):
        return f"Test {self.id} - {self.user.username}"

    class Meta:
        db_table = "vocational_tests"


class VocationalAnswer(models.Model):
    """
    Modelo para las respuestas de los tests vocacionales
    """

    test = models.ForeignKey(
        VocationalTest, on_delete=models.CASCADE, related_name="answers"
    )
    pregunta = models.TextField()
    respuesta = models.TextField()

    def __str__(self):
        return f"Respuesta - Test {self.test.id}"

    class Meta:
        db_table = "vocational_answers"

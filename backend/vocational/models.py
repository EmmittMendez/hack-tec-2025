from django.db import models
from django.conf import settings


class VocationalTest(models.Model):
    """
    Modelo para los tests vocacionales realizados por los usuarios
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='vocational_tests')
    fecha = models.DateTimeField(auto_now_add=True)
    resultado = models.CharField(max_length=255)
    puntaje = models.IntegerField()
    
    class Meta:
        db_table = 'vocational_tests'
        verbose_name = 'Test Vocacional'
        verbose_name_plural = 'Tests Vocacionales'
        ordering = ['-fecha']
    
    def __str__(self):
        return f"Test de {self.user.get_full_name()} - {self.resultado} ({self.puntaje})"


class VocationalAnswer(models.Model):
    """
    Modelo para las respuestas individuales de cada test vocacional
    """
    test = models.ForeignKey(VocationalTest, on_delete=models.CASCADE, related_name='answers')
    pregunta = models.TextField()
    respuesta = models.TextField()
    
    class Meta:
        db_table = 'vocational_answers'
        verbose_name = 'Respuesta Vocacional'
        verbose_name_plural = 'Respuestas Vocacionales'
    
    def __str__(self):
        return f"Respuesta del test {self.test.id} - {self.pregunta[:50]}..."

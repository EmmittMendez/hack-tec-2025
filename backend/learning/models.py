from django.db import models
from django.conf import settings


class LearningPath(models.Model):
    """
    Modelo para las rutas de aprendizaje
    """
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    categoria = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'learning_paths'
        verbose_name = 'Ruta de Aprendizaje'
        verbose_name_plural = 'Rutas de Aprendizaje'
    
    def __str__(self):
        return self.nombre


class Course(models.Model):
    """
    Modelo para los cursos
    """
    NIVEL_CHOICES = [
        ('basico', 'Básico'),
        ('intermedio', 'Intermedio'),
        ('avanzado', 'Avanzado'),
    ]
    
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField()
    categoria = models.CharField(max_length=100)
    nivel = models.CharField(max_length=20, choices=NIVEL_CHOICES)
    is_externo = models.BooleanField(default=False)
    url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'courses'
        verbose_name = 'Curso'
        verbose_name_plural = 'Cursos'
    
    def __str__(self):
        return self.titulo


class Lesson(models.Model):
    """
    Modelo para las lecciones de los cursos
    """
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    titulo = models.CharField(max_length=255)
    contenido = models.TextField()
    orden = models.IntegerField()
    duracion_estimada = models.IntegerField(help_text="Duración en minutos")
    
    class Meta:
        db_table = 'lessons'
        verbose_name = 'Lección'
        verbose_name_plural = 'Lecciones'
        ordering = ['orden']
    
    def __str__(self):
        return f"{self.course.titulo} - {self.titulo}"


class UserLearningPath(models.Model):
    """
    Modelo para el seguimiento de rutas de aprendizaje de usuarios
    """
    ESTADO_CHOICES = [
        ('activa', 'Activa'),
        ('terminada', 'Terminada'),
        ('descartada', 'Descartada'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='learning_paths')
    path = models.ForeignKey(LearningPath, on_delete=models.CASCADE, related_name='user_paths')
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='activa')
    feedback = models.TextField(blank=True, null=True)
    progreso = models.IntegerField(default=0, help_text="Progreso en porcentaje")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'user_learning_paths'
        verbose_name = 'Ruta de Usuario'
        verbose_name_plural = 'Rutas de Usuarios'
        unique_together = ['user', 'path']
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.path.nombre}"


class LessonProgress(models.Model):
    """
    Modelo para el progreso de lecciones individuales
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='lesson_progress')
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='user_progress')
    fecha_inicio = models.DateTimeField(auto_now_add=True)
    fecha_fin = models.DateTimeField(blank=True, null=True)
    completado = models.BooleanField(default=False)
    duracion_real = models.IntegerField(default=0, help_text="Minutos vistos")
    
    class Meta:
        db_table = 'lesson_progress'
        verbose_name = 'Progreso de Lección'
        verbose_name_plural = 'Progreso de Lecciones'
        unique_together = ['user', 'lesson']
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.lesson.titulo}"


class UserCourseProgress(models.Model):
    """
    Modelo para el progreso general de cursos
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='course_progress')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='user_progress')
    porcentaje = models.IntegerField(default=0)
    fecha_inicio = models.DateTimeField(auto_now_add=True)
    fecha_fin = models.DateTimeField(blank=True, null=True)
    
    class Meta:
        db_table = 'user_course_progress'
        verbose_name = 'Progreso de Curso'
        verbose_name_plural = 'Progreso de Cursos'
        unique_together = ['user', 'course']
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.course.titulo} ({self.porcentaje}%)"


class LearningPathCourse(models.Model):
    """
    Modelo para relacionar cursos con rutas de aprendizaje
    """
    path = models.ForeignKey(LearningPath, on_delete=models.CASCADE, related_name='path_courses')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='learning_paths')
    orden = models.IntegerField()
    
    class Meta:
        db_table = 'learning_path_courses'
        verbose_name = 'Curso de Ruta'
        verbose_name_plural = 'Cursos de Rutas'
        unique_together = ['path', 'course']
        ordering = ['orden']
    
    def __str__(self):
        return f"{self.path.nombre} - {self.course.titulo}"

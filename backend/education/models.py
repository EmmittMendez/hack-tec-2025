from django.db import models
from django.conf import settings


class LearningPath(models.Model):
    """
    Modelo para las rutas de aprendizaje
    """

    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    categoria = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

    class Meta:
        db_table = "learning_paths"


class UserLearningPath(models.Model):
    """
    Modelo para la relación usuario-ruta de aprendizaje
    """

    ESTADO_CHOICES = [
        ("activa", "Activa"),
        ("terminada", "Terminada"),
        ("descartada", "Descartada"),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    path = models.ForeignKey(LearningPath, on_delete=models.CASCADE)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default="activa")
    feedback = models.TextField(blank=True, null=True)
    progreso = models.IntegerField(default=0)  # Porcentaje 0-100

    def __str__(self):
        return f"{self.user.username} - {self.path.nombre}"

    class Meta:
        db_table = "user_learning_paths"
        unique_together = ["user", "path"]


class Course(models.Model):
    """
    Modelo para los cursos
    """

    NIVEL_CHOICES = [
        ("basico", "Básico"),
        ("intermedio", "Intermedio"),
        ("avanzado", "Avanzado"),
    ]

    titulo = models.CharField(max_length=255)
    descripcion = models.TextField()
    categoria = models.CharField(max_length=100)
    nivel = models.CharField(max_length=20, choices=NIVEL_CHOICES)
    is_externo = models.BooleanField(default=False)
    url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.titulo

    class Meta:
        db_table = "courses"


class Lesson(models.Model):
    """
    Modelo para las lecciones
    """

    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="lessons")
    titulo = models.CharField(max_length=255)
    contenido = models.TextField()
    orden = models.IntegerField()
    duracion_estimada = models.IntegerField()  # en minutos

    def __str__(self):
        return f"{self.course.titulo} - {self.titulo}"

    class Meta:
        db_table = "lessons"
        ordering = ["orden"]


class LessonProgress(models.Model):
    """
    Modelo para el progreso de lecciones por usuario
    """

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    fecha_inicio = models.DateTimeField(auto_now_add=True)
    fecha_fin = models.DateTimeField(blank=True, null=True)
    completado = models.BooleanField(default=False)
    duracion_real = models.IntegerField(default=0)  # minutos vistos

    def __str__(self):
        return f"{self.user.username} - {self.lesson.titulo}"

    class Meta:
        db_table = "lesson_progress"
        unique_together = ["user", "lesson"]


class UserCourseProgress(models.Model):
    """
    Modelo para el progreso de cursos por usuario
    """

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    porcentaje = models.IntegerField(default=0)
    fecha_inicio = models.DateTimeField(auto_now_add=True)
    fecha_fin = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.course.titulo}"

    class Meta:
        db_table = "user_course_progress"
        unique_together = ["user", "course"]


class LearningPathCourse(models.Model):
    """
    Modelo para la relación ruta de aprendizaje-curso
    """

    path = models.ForeignKey(
        LearningPath, on_delete=models.CASCADE, related_name="courses"
    )
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    orden = models.IntegerField()

    def __str__(self):
        return f"{self.path.nombre} - {self.course.titulo}"

    class Meta:
        db_table = "learning_path_courses"
        ordering = ["orden"]
        unique_together = ["path", "course"]

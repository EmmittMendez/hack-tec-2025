from rest_framework import serializers
from .models import (
    LearningPath, Course, Lesson, UserLearningPath,
    LessonProgress, UserCourseProgress, LearningPathCourse
)


class LessonSerializer(serializers.ModelSerializer):
    """
    Serializer para las lecciones
    """
    class Meta:
        model = Lesson
        fields = ['id', 'titulo', 'contenido', 'orden', 'duracion_estimada']


class CourseSerializer(serializers.ModelSerializer):
    """
    Serializer para los cursos
    """
    lessons = LessonSerializer(many=True, read_only=True)
    lessons_count = serializers.IntegerField(source='lessons.count', read_only=True)
    
    class Meta:
        model = Course
        fields = [
            'id', 'titulo', 'descripcion', 'categoria', 'nivel',
            'is_externo', 'url', 'lessons_count', 'lessons', 'created_at'
        ]


class CourseListSerializer(serializers.ModelSerializer):
    """
    Serializer simplificado para listar cursos
    """
    lessons_count = serializers.IntegerField(source='lessons.count', read_only=True)
    
    class Meta:
        model = Course
        fields = [
            'id', 'titulo', 'descripcion', 'categoria', 'nivel',
            'is_externo', 'lessons_count', 'created_at'
        ]


class LearningPathCourseSerializer(serializers.ModelSerializer):
    """
    Serializer para la relación entre rutas y cursos
    """
    course = CourseListSerializer(read_only=True)
    
    class Meta:
        model = LearningPathCourse
        fields = ['id', 'course', 'orden']


class LearningPathSerializer(serializers.ModelSerializer):
    """
    Serializer para las rutas de aprendizaje
    """
    path_courses = LearningPathCourseSerializer(many=True, read_only=True)
    courses_count = serializers.IntegerField(source='path_courses.count', read_only=True)
    
    class Meta:
        model = LearningPath
        fields = [
            'id', 'nombre', 'descripcion', 'categoria',
            'courses_count', 'path_courses', 'created_at'
        ]


class LearningPathListSerializer(serializers.ModelSerializer):
    """
    Serializer simplificado para listar rutas de aprendizaje
    """
    courses_count = serializers.IntegerField(source='path_courses.count', read_only=True)
    
    class Meta:
        model = LearningPath
        fields = ['id', 'nombre', 'descripcion', 'categoria', 'courses_count', 'created_at']


class UserLearningPathSerializer(serializers.ModelSerializer):
    """
    Serializer para el seguimiento de rutas de usuarios
    """
    path = LearningPathListSerializer(read_only=True)
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    
    class Meta:
        model = UserLearningPath
        fields = [
            'id', 'user', 'user_name', 'path', 'estado',
            'feedback', 'progreso', 'created_at', 'updated_at'
        ]
        read_only_fields = ['user', 'created_at', 'updated_at']


class LessonProgressSerializer(serializers.ModelSerializer):
    """
    Serializer para el progreso de lecciones
    """
    lesson = LessonSerializer(read_only=True)
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    
    class Meta:
        model = LessonProgress
        fields = [
            'id', 'user', 'user_name', 'lesson', 'fecha_inicio',
            'fecha_fin', 'completado', 'duracion_real'
        ]
        read_only_fields = ['user', 'fecha_inicio']


class UserCourseProgressSerializer(serializers.ModelSerializer):
    """
    Serializer para el progreso de cursos
    """
    course = CourseListSerializer(read_only=True)
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    
    class Meta:
        model = UserCourseProgress
        fields = [
            'id', 'user', 'user_name', 'course', 'porcentaje',
            'fecha_inicio', 'fecha_fin'
        ]
        read_only_fields = ['user', 'fecha_inicio']


class EnrollCourseSerializer(serializers.Serializer):
    """
    Serializer para inscribirse a un curso
    """
    course_id = serializers.IntegerField()
    
    def validate_course_id(self, value):
        try:
            Course.objects.get(id=value)
        except Course.DoesNotExist:
            raise serializers.ValidationError("El curso no existe")
        return value


class EnrollLearningPathSerializer(serializers.Serializer):
    """
    Serializer para inscribirse a una ruta de aprendizaje
    """
    path_id = serializers.IntegerField()
    
    def validate_path_id(self, value):
        try:
            LearningPath.objects.get(id=value)
        except LearningPath.DoesNotExist:
            raise serializers.ValidationError("La ruta de aprendizaje no existe")
        return value

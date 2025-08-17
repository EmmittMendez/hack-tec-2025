from django.contrib import admin
from .models import (
    LearningPath, Course, Lesson, UserLearningPath,
    LessonProgress, UserCourseProgress, LearningPathCourse
)


class LessonInline(admin.TabularInline):
    model = Lesson
    extra = 0
    fields = ['titulo', 'orden', 'duracion_estimada']


class LearningPathCourseInline(admin.TabularInline):
    model = LearningPathCourse
    extra = 0
    fields = ['course', 'orden']


@admin.register(LearningPath)
class LearningPathAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'categoria', 'created_at']
    list_filter = ['categoria', 'created_at']
    search_fields = ['nombre', 'descripcion']
    inlines = [LearningPathCourseInline]


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'categoria', 'nivel', 'is_externo', 'created_at']
    list_filter = ['categoria', 'nivel', 'is_externo', 'created_at']
    search_fields = ['titulo', 'descripcion']
    inlines = [LessonInline]


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'course', 'orden', 'duracion_estimada']
    list_filter = ['course__categoria', 'course__nivel']
    search_fields = ['titulo', 'contenido', 'course__titulo']
    ordering = ['course', 'orden']


@admin.register(UserLearningPath)
class UserLearningPathAdmin(admin.ModelAdmin):
    list_display = ['user', 'path', 'estado', 'progreso', 'created_at']
    list_filter = ['estado', 'path__categoria', 'created_at']
    search_fields = ['user__nombres', 'user__apellidos', 'path__nombre']


@admin.register(LessonProgress)
class LessonProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'lesson', 'completado', 'duracion_real', 'fecha_inicio']
    list_filter = ['completado', 'lesson__course__categoria', 'fecha_inicio']
    search_fields = ['user__nombres', 'user__apellidos', 'lesson__titulo']


@admin.register(UserCourseProgress)
class UserCourseProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'course', 'porcentaje', 'fecha_inicio', 'fecha_fin']
    list_filter = ['course__categoria', 'course__nivel', 'fecha_inicio']
    search_fields = ['user__nombres', 'user__apellidos', 'course__titulo']


@admin.register(LearningPathCourse)
class LearningPathCourseAdmin(admin.ModelAdmin):
    list_display = ['path', 'course', 'orden']
    list_filter = ['path__categoria', 'course__categoria']
    search_fields = ['path__nombre', 'course__titulo']
    ordering = ['path', 'orden']

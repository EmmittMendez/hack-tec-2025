from django.contrib import admin
from .models import (
    LearningPath, UserLearningPath, Course, Lesson, 
    LessonProgress, UserCourseProgress, LearningPathCourse
)

# Registro simple de todos los modelos
admin.site.register(LearningPath)
admin.site.register(UserLearningPath)
admin.site.register(Course)
admin.site.register(Lesson)
admin.site.register(LessonProgress)
admin.site.register(UserCourseProgress)
admin.site.register(LearningPathCourse)

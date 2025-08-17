from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'learning-paths', views.LearningPathViewSet, basename='learningpaths')
router.register(r'courses', views.CourseViewSet, basename='courses')
router.register(r'lessons', views.LessonViewSet, basename='lessons')
router.register(r'user-learning-paths', views.UserLearningPathViewSet, basename='userlearningpaths')
router.register(r'lesson-progress', views.LessonProgressViewSet, basename='lessonprogress')
router.register(r'course-progress', views.UserCourseProgressViewSet, basename='courseprogress')

urlpatterns = [
    # Rutas específicas para inscripciones
    path('enroll-course/', views.EnrollCourseView.as_view(), name='enroll-course'),
    path('enroll-path/', views.EnrollLearningPathView.as_view(), name='enroll-path'),
    
    # Rutas para el progreso del usuario
    path('my-courses/', views.MyCourseProgressView.as_view(), name='my-courses'),
    path('my-paths/', views.MyLearningPathsView.as_view(), name='my-paths'),
    path('my-lessons/', views.MyLessonProgressView.as_view(), name='my-lessons'),
    
    # ViewSets del router
    path('', include(router.urls)),
]

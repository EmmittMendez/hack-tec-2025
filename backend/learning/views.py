from rest_framework import generics, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.shortcuts import get_object_or_404
from .models import (
    LearningPath, Course, Lesson, UserLearningPath,
    LessonProgress, UserCourseProgress, LearningPathCourse
)
from .serializers import (
    LearningPathSerializer, CourseSerializer, LessonSerializer,
    UserLearningPathSerializer, LessonProgressSerializer,
    UserCourseProgressSerializer, EnrollCourseSerializer,
    EnrollLearningPathSerializer, LearningPathListSerializer,
    CourseListSerializer
)


class LearningPathViewSet(viewsets.ModelViewSet):
    """
    ViewSet para el manejo de rutas de aprendizaje
    """
    queryset = LearningPath.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return LearningPathListSerializer
        return LearningPathSerializer


class CourseViewSet(viewsets.ModelViewSet):
    """
    ViewSet para el manejo de cursos
    """
    queryset = Course.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return CourseListSerializer
        return CourseSerializer


class LessonViewSet(viewsets.ModelViewSet):
    """
    ViewSet para el manejo de lecciones
    """
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class UserLearningPathViewSet(viewsets.ModelViewSet):
    """
    ViewSet para el manejo de rutas de aprendizaje de usuarios
    """
    serializer_class = UserLearningPathSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return UserLearningPath.objects.all()
        return UserLearningPath.objects.filter(user=self.request.user)


class LessonProgressViewSet(viewsets.ModelViewSet):
    """
    ViewSet para el manejo del progreso de lecciones
    """
    serializer_class = LessonProgressSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return LessonProgress.objects.all()
        return LessonProgress.objects.filter(user=self.request.user)


class UserCourseProgressViewSet(viewsets.ModelViewSet):
    """
    ViewSet para el manejo del progreso de cursos
    """
    serializer_class = UserCourseProgressSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return UserCourseProgress.objects.all()
        return UserCourseProgress.objects.filter(user=self.request.user)


class EnrollCourseView(generics.CreateAPIView):
    """
    Vista para inscribirse a un curso
    """
    serializer_class = EnrollCourseSerializer
    permission_classes = [IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        course_id = serializer.validated_data['course_id']
        course = get_object_or_404(Course, id=course_id)
        
        # Verificar si el usuario ya está inscrito
        progress, created = UserCourseProgress.objects.get_or_create(
            user=request.user,
            course=course,
            defaults={'porcentaje': 0}
        )
        
        if not created:
            return Response({
                'message': 'Ya estás inscrito en este curso'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({
            'message': f'Te has inscrito exitosamente al curso: {course.titulo}',
            'course_progress': UserCourseProgressSerializer(progress).data
        }, status=status.HTTP_201_CREATED)


class EnrollLearningPathView(generics.CreateAPIView):
    """
    Vista para inscribirse a una ruta de aprendizaje
    """
    serializer_class = EnrollLearningPathSerializer
    permission_classes = [IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        path_id = serializer.validated_data['path_id']
        path = get_object_or_404(LearningPath, id=path_id)
        
        # Verificar si el usuario ya está inscrito
        user_path, created = UserLearningPath.objects.get_or_create(
            user=request.user,
            path=path,
            defaults={'estado': 'activa', 'progreso': 0}
        )
        
        if not created:
            return Response({
                'message': 'Ya estás inscrito en esta ruta de aprendizaje'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({
            'message': f'Te has inscrito exitosamente a la ruta: {path.nombre}',
            'user_path': UserLearningPathSerializer(user_path).data
        }, status=status.HTTP_201_CREATED)


class MyCourseProgressView(generics.ListAPIView):
    """
    Vista para listar el progreso de cursos del usuario actual
    """
    serializer_class = UserCourseProgressSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return UserCourseProgress.objects.filter(user=self.request.user)


class MyLearningPathsView(generics.ListAPIView):
    """
    Vista para listar las rutas de aprendizaje del usuario actual
    """
    serializer_class = UserLearningPathSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return UserLearningPath.objects.filter(user=self.request.user)


class MyLessonProgressView(generics.ListAPIView):
    """
    Vista para listar el progreso de lecciones del usuario actual
    """
    serializer_class = LessonProgressSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return LessonProgress.objects.filter(user=self.request.user)

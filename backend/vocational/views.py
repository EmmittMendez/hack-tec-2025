from rest_framework import generics, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import VocationalTest, VocationalAnswer
from .serializers import (
    VocationalTestSerializer, VocationalAnswerSerializer,
    VocationalTestCreateSerializer, VocationalTestListSerializer
)


class VocationalTestViewSet(viewsets.ModelViewSet):
    """
    ViewSet para el manejo de tests vocacionales
    """
    serializer_class = VocationalTestSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return VocationalTest.objects.all()
        return VocationalTest.objects.filter(user=self.request.user)
    
    def get_serializer_class(self):
        if self.action == 'list':
            return VocationalTestListSerializer
        elif self.action == 'create':
            return VocationalTestCreateSerializer
        return VocationalTestSerializer


class VocationalAnswerViewSet(viewsets.ModelViewSet):
    """
    ViewSet para el manejo de respuestas vocacionales
    """
    serializer_class = VocationalAnswerSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return VocationalAnswer.objects.all()
        return VocationalAnswer.objects.filter(test__user=self.request.user)


class MyVocationalTestsView(generics.ListAPIView):
    """
    Vista para listar los tests vocacionales del usuario actual
    """
    serializer_class = VocationalTestListSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return VocationalTest.objects.filter(user=self.request.user)


class CreateVocationalTestView(generics.CreateAPIView):
    """
    Vista para crear un nuevo test vocacional
    """
    serializer_class = VocationalTestCreateSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

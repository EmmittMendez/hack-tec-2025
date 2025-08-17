from rest_framework import generics, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.db.models import Q
from .models import University, Program, Scholarship
from .serializers import (
    UniversitySerializer, ProgramSerializer, ScholarshipSerializer,
    UniversityListSerializer, ProgramListSerializer, ScholarshipListSerializer
)


class UniversityViewSet(viewsets.ModelViewSet):
    """
    ViewSet para el manejo de universidades
    """
    queryset = University.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return UniversityListSerializer
        return UniversitySerializer


class ProgramViewSet(viewsets.ModelViewSet):
    """
    ViewSet para el manejo de programas académicos
    """
    queryset = Program.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ProgramListSerializer
        return ProgramSerializer


class ScholarshipViewSet(viewsets.ModelViewSet):
    """
    ViewSet para el manejo de becas
    """
    queryset = Scholarship.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ScholarshipListSerializer
        return ScholarshipSerializer


class SearchUniversitiesView(generics.ListAPIView):
    """
    Vista para buscar universidades por nombre, estado o tipo
    """
    serializer_class = UniversityListSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = University.objects.all()
        search = self.request.query_params.get('search', None)
        estado = self.request.query_params.get('estado', None)
        tipo = self.request.query_params.get('tipo', None)
        
        if search:
            queryset = queryset.filter(
                Q(nombre__icontains=search) | Q(descripcion__icontains=search)
            )
        
        if estado:
            queryset = queryset.filter(estado__icontains=estado)
        
        if tipo:
            queryset = queryset.filter(tipo=tipo)
        
        return queryset


class SearchProgramsView(generics.ListAPIView):
    """
    Vista para buscar programas por nombre, área o universidad
    """
    serializer_class = ProgramListSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = Program.objects.all()
        search = self.request.query_params.get('search', None)
        area = self.request.query_params.get('area', None)
        universidad = self.request.query_params.get('universidad', None)
        beca_disponible = self.request.query_params.get('beca_disponible', None)
        
        if search:
            queryset = queryset.filter(
                Q(nombre__icontains=search) | 
                Q(universidad__nombre__icontains=search)
            )
        
        if area:
            queryset = queryset.filter(area__icontains=area)
        
        if universidad:
            queryset = queryset.filter(universidad__nombre__icontains=universidad)
        
        if beca_disponible:
            queryset = queryset.filter(beca_disponible=beca_disponible.lower() == 'true')
        
        return queryset


class SearchScholarshipsView(generics.ListAPIView):
    """
    Vista para buscar becas por nombre, tipo o universidad
    """
    serializer_class = ScholarshipListSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        queryset = Scholarship.objects.all()
        search = self.request.query_params.get('search', None)
        tipo = self.request.query_params.get('tipo', None)
        universidad = self.request.query_params.get('universidad', None)
        
        if search:
            queryset = queryset.filter(
                Q(nombre__icontains=search) | 
                Q(requisitos__icontains=search) |
                Q(universidad__nombre__icontains=search)
            )
        
        if tipo:
            queryset = queryset.filter(tipo=tipo)
        
        if universidad:
            queryset = queryset.filter(universidad__nombre__icontains=universidad)
        
        return queryset


class ProgramsByAreaView(generics.ListAPIView):
    """
    Vista para obtener programas agrupados por área
    """
    serializer_class = ProgramListSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        area = self.request.query_params.get('area', None)
        if area:
            return Program.objects.filter(area__icontains=area)
        return Program.objects.all()


class ScholarshipsByTypeView(generics.ListAPIView):
    """
    Vista para obtener becas agrupadas por tipo
    """
    serializer_class = ScholarshipListSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        tipo = self.request.query_params.get('tipo', None)
        if tipo:
            return Scholarship.objects.filter(tipo=tipo)
        return Scholarship.objects.all()

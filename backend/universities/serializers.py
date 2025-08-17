from rest_framework import serializers
from .models import University, Program, Scholarship


class ScholarshipSerializer(serializers.ModelSerializer):
    """
    Serializer para las becas
    """
    universidad_nombre = serializers.CharField(source='universidad.nombre', read_only=True)
    
    class Meta:
        model = Scholarship
        fields = [
            'id', 'universidad', 'universidad_nombre', 'nombre',
            'tipo', 'requisitos', 'link', 'created_at'
        ]


class ProgramSerializer(serializers.ModelSerializer):
    """
    Serializer para los programas académicos
    """
    universidad_nombre = serializers.CharField(source='universidad.nombre', read_only=True)
    universidad_tipo = serializers.CharField(source='universidad.tipo', read_only=True)
    
    class Meta:
        model = Program
        fields = [
            'id', 'universidad', 'universidad_nombre', 'universidad_tipo',
            'nombre', 'area', 'plan_estudios_url', 'convocatoria_url',
            'beca_disponible', 'created_at'
        ]


class UniversitySerializer(serializers.ModelSerializer):
    """
    Serializer para las universidades con programas y becas
    """
    programs = ProgramSerializer(many=True, read_only=True)
    scholarships = ScholarshipSerializer(many=True, read_only=True)
    programs_count = serializers.IntegerField(source='programs.count', read_only=True)
    scholarships_count = serializers.IntegerField(source='scholarships.count', read_only=True)
    
    class Meta:
        model = University
        fields = [
            'id', 'nombre', 'estado', 'tipo', 'descripcion',
            'programs_count', 'scholarships_count',
            'programs', 'scholarships', 'created_at'
        ]


class UniversityListSerializer(serializers.ModelSerializer):
    """
    Serializer simplificado para listar universidades
    """
    programs_count = serializers.IntegerField(source='programs.count', read_only=True)
    scholarships_count = serializers.IntegerField(source='scholarships.count', read_only=True)
    
    class Meta:
        model = University
        fields = [
            'id', 'nombre', 'estado', 'tipo', 'descripcion',
            'programs_count', 'scholarships_count', 'created_at'
        ]


class ProgramListSerializer(serializers.ModelSerializer):
    """
    Serializer simplificado para listar programas
    """
    universidad_nombre = serializers.CharField(source='universidad.nombre', read_only=True)
    universidad_estado = serializers.CharField(source='universidad.estado', read_only=True)
    universidad_tipo = serializers.CharField(source='universidad.tipo', read_only=True)
    
    class Meta:
        model = Program
        fields = [
            'id', 'universidad_nombre', 'universidad_estado', 'universidad_tipo',
            'nombre', 'area', 'beca_disponible', 'created_at'
        ]


class ScholarshipListSerializer(serializers.ModelSerializer):
    """
    Serializer simplificado para listar becas
    """
    universidad_nombre = serializers.CharField(source='universidad.nombre', read_only=True)
    universidad_estado = serializers.CharField(source='universidad.estado', read_only=True)
    
    class Meta:
        model = Scholarship
        fields = [
            'id', 'universidad_nombre', 'universidad_estado',
            'nombre', 'tipo', 'created_at'
        ]

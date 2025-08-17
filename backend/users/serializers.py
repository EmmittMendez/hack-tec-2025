from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo User
    """
    estado_display = serializers.CharField(source='get_estado_display', read_only=True)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'nombres', 'apellidos', 
                 'ultimo_grado_estudios', 'estado', 'estado_display', 'date_joined')
        read_only_fields = ('id', 'date_joined', 'estado_display')


class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer para registro de usuario
    """
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password_confirm', 
                 'nombres', 'apellidos', 'ultimo_grado_estudios', 'estado')

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Las contraseñas no coinciden")
        return attrs

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    """
    Serializer para login
    """
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise serializers.ValidationError('Credenciales inválidas')
            if not user.is_active:
                raise serializers.ValidationError('Usuario inactivo')
            attrs['user'] = user
            return attrs
        else:
            raise serializers.ValidationError('Debe proporcionar username y password')

    def create(self, validated_data):
        # Este método no se usa para login, pero es requerido por la clase base
        pass

    def update(self, instance, validated_data):
        # Este método no se usa para login, pero es requerido por la clase base
        pass

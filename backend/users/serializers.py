from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from .models import User


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Serializer personalizado para JWT que incluye datos adicionales del usuario
    """
    username_field = 'email'  # Usar email en lugar de username
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # Agregar claims personalizados al token
        token['nombres'] = user.nombres
        token['apellidos'] = user.apellidos
        token['email'] = user.email
        token['username'] = user.username
        token['full_name'] = user.get_full_name()
        token['ultimo_grado_estudios'] = user.ultimo_grado_estudios
        token['estado'] = user.estado
        
        return token
    
    def validate(self, attrs):
        # Usar email en lugar de username para autenticación
        email = attrs.get('email')
        password = attrs.get('password')
        
        if email and password:
            user = authenticate(request=self.context.get('request'),
                              username=email, password=password)
            if not user:
                raise serializers.ValidationError('Credenciales inválidas')
            if not user.is_active:
                raise serializers.ValidationError('Cuenta desactivada')
        else:
            raise serializers.ValidationError('Email y contraseña son requeridos')
        
        data = super().validate(attrs)
        return data


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo User
    """
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'nombres', 'apellidos',
            'ultimo_grado_estudios', 'estado', 'password',
            'date_joined', 'is_active'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'date_joined': {'read_only': True},
            'is_active': {'read_only': True}
        }
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        if password:
            instance.set_password(password)
        
        instance.save()
        return instance


class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer para el registro de usuarios con JWT
    """
    password = serializers.CharField(write_only=True, min_length=8,
                                   help_text="La contraseña debe tener al menos 8 caracteres")
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = [
            'username', 'email', 'nombres', 'apellidos',
            'ultimo_grado_estudios', 'estado', 'password', 'password_confirm'
        ]
        extra_kwargs = {
            'email': {'required': True},
            'nombres': {'required': True},
            'apellidos': {'required': True},
        }
    
    def validate_email(self, value):
        """Validar que el email sea único"""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Ya existe un usuario con este email")
        return value
    
    def validate_username(self, value):
        """Validar que el username sea único"""
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Ya existe un usuario con este nombre de usuario")
        return value
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Las contraseñas no coinciden")
        attrs.pop('password_confirm')  # Remover antes de crear el usuario
        return attrs
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user


class JWTLoginSerializer(serializers.Serializer):
    """
    Serializer para el login con JWT
    """
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        if email and password:
            user = authenticate(request=self.context.get('request'),
                              username=email, password=password)
            if not user:
                raise serializers.ValidationError('Credenciales inválidas')
            if not user.is_active:
                raise serializers.ValidationError('Cuenta desactivada')
            attrs['user'] = user
            return attrs
        else:
            raise serializers.ValidationError('Email y contraseña son requeridos')


class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer para el perfil público del usuario
    """
    full_name = serializers.CharField(source='get_full_name', read_only=True)
    
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'nombres', 'apellidos',
            'full_name', 'ultimo_grado_estudios', 'estado', 'date_joined'
        ]
        read_only_fields = ['id', 'username', 'email', 'date_joined']

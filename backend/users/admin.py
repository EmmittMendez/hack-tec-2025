from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from .models import User

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('username', 'email', 'nombres', 'apellidos')

class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = ('username', 'email', 'nombres', 'apellidos', 'ultimo_grado_estudios', 'estado')

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    
    list_display = ('username', 'email', 'nombres', 'apellidos', 'estado', 'ultimo_grado_estudios', 'is_staff', 'is_active', 'date_joined')
    list_filter = ('is_staff', 'is_active', 'estado', 'ultimo_grado_estudios', 'date_joined')
    search_fields = ('username', 'email', 'nombres', 'apellidos')
    ordering = ('username',)
    
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Información Personal', {'fields': ('nombres', 'apellidos', 'email')}),
        ('Información Educativa', {'fields': ('ultimo_grado_estudios', 'estado')}),
        ('Permisos', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Fechas Importantes', {'fields': ('last_login', 'date_joined')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'nombres', 'apellidos', 'password1', 'password2'),
        }),
    )

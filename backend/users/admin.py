from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['email', 'username', 'nombres', 'apellidos', 'ultimo_grado_estudios', 'estado', 'is_active', 'date_joined']
    list_filter = ['is_active', 'is_staff', 'estado', 'ultimo_grado_estudios']
    search_fields = ['email', 'username', 'nombres', 'apellidos']
    ordering = ['-date_joined']
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Información Personal', {
            'fields': ('nombres', 'apellidos', 'ultimo_grado_estudios', 'estado')
        }),
    )
    
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Información Personal', {
            'fields': ('nombres', 'apellidos', 'email', 'ultimo_grado_estudios', 'estado')
        }),
    )

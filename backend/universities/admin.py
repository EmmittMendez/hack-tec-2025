from django.contrib import admin
from .models import University, Program, Scholarship


class ProgramInline(admin.TabularInline):
    model = Program
    extra = 0
    fields = ['nombre', 'area', 'beca_disponible']


class ScholarshipInline(admin.TabularInline):
    model = Scholarship
    extra = 0
    fields = ['nombre', 'tipo']


@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'estado', 'tipo', 'created_at']
    list_filter = ['tipo', 'estado', 'created_at']
    search_fields = ['nombre', 'descripcion']
    inlines = [ProgramInline, ScholarshipInline]


@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'universidad', 'area', 'beca_disponible', 'created_at']
    list_filter = ['area', 'beca_disponible', 'universidad__tipo', 'created_at']
    search_fields = ['nombre', 'universidad__nombre', 'area']


@admin.register(Scholarship)
class ScholarshipAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'universidad', 'tipo', 'created_at']
    list_filter = ['tipo', 'universidad__tipo', 'created_at']
    search_fields = ['nombre', 'universidad__nombre', 'requisitos']

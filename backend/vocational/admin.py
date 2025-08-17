from django.contrib import admin
from .models import VocationalTest, VocationalAnswer


class VocationalAnswerInline(admin.TabularInline):
    model = VocationalAnswer
    extra = 0
    readonly_fields = ['pregunta', 'respuesta']


@admin.register(VocationalTest)
class VocationalTestAdmin(admin.ModelAdmin):
    list_display = ['user', 'fecha', 'resultado', 'puntaje']
    list_filter = ['fecha', 'resultado']
    search_fields = ['user__nombres', 'user__apellidos', 'user__email', 'resultado']
    readonly_fields = ['fecha']
    inlines = [VocationalAnswerInline]
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user')


@admin.register(VocationalAnswer)
class VocationalAnswerAdmin(admin.ModelAdmin):
    list_display = ['test', 'pregunta_short', 'respuesta_short']
    list_filter = ['test__fecha']
    search_fields = ['pregunta', 'respuesta']
    
    def pregunta_short(self, obj):
        return obj.pregunta[:50] + "..." if len(obj.pregunta) > 50 else obj.pregunta
    pregunta_short.short_description = 'Pregunta'
    
    def respuesta_short(self, obj):
        return obj.respuesta[:50] + "..." if len(obj.respuesta) > 50 else obj.respuesta
    respuesta_short.short_description = 'Respuesta'

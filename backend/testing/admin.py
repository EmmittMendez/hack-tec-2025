from django.contrib import admin
from .models import VocationalTest, VocationalAnswer

# Registro simple de todos los modelos
admin.site.register(VocationalTest)
admin.site.register(VocationalAnswer)

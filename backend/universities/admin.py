from django.contrib import admin
from .models import University, Program, Scholarship

# Registro simple de todos los modelos
admin.site.register(University)
admin.site.register(Program)
admin.site.register(Scholarship)

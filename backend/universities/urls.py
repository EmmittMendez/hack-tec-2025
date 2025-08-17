from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'universities', views.UniversityViewSet, basename='universities')
router.register(r'programs', views.ProgramViewSet, basename='programs')
router.register(r'scholarships', views.ScholarshipViewSet, basename='scholarships')

urlpatterns = [
    # Rutas específicas para búsquedas
    path('search-universities/', views.SearchUniversitiesView.as_view(), name='search-universities'),
    path('search-programs/', views.SearchProgramsView.as_view(), name='search-programs'),
    path('search-scholarships/', views.SearchScholarshipsView.as_view(), name='search-scholarships'),
    
    # Rutas para filtros específicos
    path('programs-by-area/', views.ProgramsByAreaView.as_view(), name='programs-by-area'),
    path('scholarships-by-type/', views.ScholarshipsByTypeView.as_view(), name='scholarships-by-type'),
    
    # ViewSets del router
    path('', include(router.urls)),
]

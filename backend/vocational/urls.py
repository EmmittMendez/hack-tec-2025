from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'tests', views.VocationalTestViewSet, basename='vocationaltests')
router.register(r'answers', views.VocationalAnswerViewSet, basename='vocationalanswers')

urlpatterns = [
    # Rutas específicas para tests vocacionales
    path('my-tests/', views.MyVocationalTestsView.as_view(), name='my-tests'),
    path('create-test/', views.CreateVocationalTestView.as_view(), name='create-test'),
    
    # ViewSets del router
    path('', include(router.urls)),
]

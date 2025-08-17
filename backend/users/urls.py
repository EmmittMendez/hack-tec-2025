from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename='users')

urlpatterns = [
    # Autenticación JWT
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.CustomTokenObtainPairView.as_view(), name='login'),
    path('login-custom/', views.LoginView.as_view(), name='login-custom'),  # Vista personalizada
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    
    # Perfil de usuario
    path('profile/', views.ProfileView.as_view(), name='profile'),
    
    # ViewSets del router
    path('', include(router.urls)),
]

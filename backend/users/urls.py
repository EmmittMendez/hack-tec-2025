from django.urls import path
from .views import (
    CustomTokenObtainPairView,
    CustomTokenRefreshView,
    register_user,
    logout_user,
    user_profile
)

app_name = 'users'

urlpatterns = [
    # Autenticación
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('auth/register/', register_user, name='register'),
    path('auth/logout/', logout_user, name='logout'),
    path('auth/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    
    # Usuario
    path('profile/', user_profile, name='profile'),
]

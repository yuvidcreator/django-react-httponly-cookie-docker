from django.urls import path
from apps.accounts import views
from django.views.decorators.csrf import csrf_exempt

# app_name = "account"

urlpatterns = [
    path('login/', views.loginView),
    path('register/', views.registerView),
    path('refresh-token/', views.CookieTokenRefreshView.as_view()),
    path('logout/', views.logoutView),
    path("user/", views.user),
]

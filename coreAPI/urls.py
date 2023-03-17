"""coreAPI URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView, TokenVerifyView)
from django.urls import re_path as url
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions



def trigger_error(request):
    division_by_zero = 1 / 0



urlpatterns = [
    path("api/token/", TokenObtainPairView.as_view()),
    path("api/token/refresh/", TokenRefreshView.as_view()),
    path("api/token/verify/", TokenVerifyView.as_view()),

    path('admin/', admin.site.urls),
    path('sentry-debug/', trigger_error),

    path('api/v1/accounts/', include('apps.accounts.urls')),
    path('api/v1/common/', include('apps.common.urls')),
    path('api/v1/products/', include('apps.products.urls')),
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


schema_view = get_schema_view(
    openapi.Info(
        title="Core API",
        default_version="v1",
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

api_docs = [
        url(
            r"^swagger(?P<format>\.json|\.yaml)$",
            schema_view.without_ui(cache_timeout=0),
            name="schema-json",
        ),
        url(
            r"^swagger/$",
            schema_view.with_ui("swagger", cache_timeout=0),
            name="schema-swagger-ui",
        ),
        url(
            r"^redoc/$",
            schema_view.with_ui("redoc", cache_timeout=0),
            name="schema-redoc",
        ),
    ]
urlpatterns += api_docs



admin.site.site_header = "Core API"
admin.site.site_title = "Core API Admin Panel"
admin.site.index_title = "Welcome to Core API"
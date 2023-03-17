"""
WSGI config for coreAPI project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
from coreAPI.settings.base import env



if env("DEV_PAHSE")=="dev":
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'coreAPI.settings.development')
else:
    print("Prodcution py set")
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'coreAPI.settings.production')

application = get_wsgi_application()

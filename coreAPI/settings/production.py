from coreAPI.settings.base import *


dev_phase = env("DEV_PAHSE")
print(dev_phase)

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

if env("DEV_PAHSE")=="prod":
    if DEBUG:
        DATABASES = {
            "default": {
                "ENGINE": env("DEV_DB_ENGINE"),
                "NAME": env("DEV_DB_NAME"),
                "USER": env("DEV_DB_USER"),
                "PASSWORD": env("DEV_DB_PASS"),
                "HOST": env("DEV_DB_HOST"),
                "PORT": env("DEV_DB_PORT"),
            }
        }
    else:
        DATABASES = {
            "default": {
                "ENGINE": env("POSTGRES_ENGINE"),
                "NAME": env("POSTGRES_DB"),
                "USER": env("POSTGRES_USER"),
                "PASSWORD": env("POSTGRES_PASSWORD"),
                "HOST": env("POSTGRES_DB_HOST"),
                "PORT": env("POSTGRES_DB_PORT"),
            }
        }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }

# Async Email Backend Settings
EMAIL_BACKEND = env("PROD_EMAIL_BACKEND")
EMAIL_HOST = env("PROD_EMAIL_HOST")
EMAIL_USE_TLS = env("PROD_EMAIL_USE_TLS")
EMAIL_PORT = env("PROD_EMAIL_PORT")
EMAIL_HOST_USER = env("PROD_EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = env("PROD_EMAIL_HOST_PASSWORD")
EMAIL_FROM = env("PROD_EMAIL_FROM")



# Production twiilio sms creds
# SMS = {
#     "account_sid": env("account_sid_dev"),
#     "auth_token": env("auth_token_dev"),
#     "from_number": env("from_number_dev"),
# }
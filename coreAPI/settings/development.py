from coreAPI.settings.base import *

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

dev_phase = env("DEV_PAHSE")
print(dev_phase)

if env("DEV_PAHSE") == "dev":
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
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }



EMAIL_BACKEND = env("EMAIL_BACKEND")
EMAIL_HOST = env("EMAIL_HOST")
EMAIL_USE_TLS = env("EMAIL_USE_TLS")
EMAIL_PORT = env("EMAIL_PORT")
EMAIL_HOST_USER = env("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD")
EMAIL_FROM = env("EMAIL_FROM")



# Dev twiilio sms creds
# SMS = {
#     "account_sid": env("account_sid_dev"),
#     "auth_token": env("auth_token_dev"),
#     "from_number": env("from_number_dev"),
# }
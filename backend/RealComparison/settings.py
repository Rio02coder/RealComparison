"""
Django settings for RealComparison project.

Generated by 'django-admin startproject' using Django 4.0.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.0/ref/settings/
"""

from dotenv import load_dotenv

import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-ljjjj3ka@qlk%sm13c$-043e84-r8er1lscy^h#3hi+qo_o83@'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [os.getenv("DEVELOPMENT_IP"), "127.0.0.1"]

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_password_validators',
    'django_filters',
    'rest_framework',
    'rest_framework.authtoken',
    'core',
    'phonenumber_field',
    'storages',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'RealComparison.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'RealComparison.wsgi.application'

# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, "db.sqlite3"),
    }
}

# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
        'OPTIONS': {
            'user_attributes': (
                'username', 'first_name', 'last_name', 'phone_number',
            ),
            'max_similarity': 0.7
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {
            'min_length': 6,
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
    {
        'NAME': 'core.helpers.validators.password_validators.number_validator.NumberValidator',
        'OPTIONS': {
            'min_digits': 1,
        }
    },
    {
        'NAME': 'core.helpers.validators.password_validators.upper_case_validator.UpperCaseValidator',
        'OPTIONS': {
            'min_digits': 1,
        }
    },
    {
        'NAME': 'core.helpers.validators.password_validators.lower_case_validator.LowerCaseValidator',
        'OPTIONS': {
            'min_digits': 1,
        }
    },
    {
        'NAME': 'core.helpers.validators.password_validators.symbol_validator.SymbolValidator',
        'OPTIONS': {
            'min_digits': 1,
        }
    },
]

# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/
LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/
STATIC_URL = '/static/'

load_dotenv()


EMAIL_BACKEND = os.environ.get("EMAIL_BACKEND")
EMAIL_HOST = os.environ.get("EMAIL_HOST")
EMAIL_USE_TLS = os.environ.get("EMAIL_USE_TLS")
EMAIL_PORT = os.environ.get("EMAIL_PORT")
EMAIL_HOST_USER = os.environ.get("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD")

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Configuration to use the amazon s3 host service.
DEFAULT_FILE_STORAGE = os.environ.get("DEFAULT_FILE_STORAGE")
AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = os.environ.get("AWS_STORAGE_BUCKET_NAME")
AWS_QUERYSTRING_AUTH = os.environ.get("AWS_QUERYSTRING_AUTH")
AWS_S3_REGION_NAME = os.environ.get("AWS_S3_REGION_NAME")

# User model for authentication purposes
AUTH_USER_MODEL = 'core.User'

# Rest framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'core.authentication.tokens.token_authenticator.TokenAuthentication',  # <-- And here
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

# Authentication tokens settings
ACCESS_TOKEN_EXPIRY_TIME = 36000      # in seconds. # currently expires after 10 hours.
REFRESH_TOKEN_EXPIRY_TIME = 604800     # in seconds. # currently expires after a week.
MAX_STORED_REFRESH_TOKENS = 3       # Maximum number of refresh tokens stored per user.

# Ownership verification settings
VERIFICATION_CODE_DIGIT_LENGTH = 6      # How many digits long the verification codes should be.
VERIFICATION_CODE_EXPIRY_TIME = 604800  # in seconds.

# User property views settings
VIEWS_INCREMENT_TIME = 120.0           # in seconds.

# Image Upload settings
MAX_STORED_IMAGES = 10 # Maximum number of images per property.

# Property recommender settings
NUMBER_OF_RECOMMENDATIONS = 5

# ML Regressor settings
CURRENT_ML_REGRESSOR = 'random_forest'

from django.contrib import admin
from .models import File
from utils.admin import BaseAdmin


@admin.register(File)
class FileAdmin(BaseAdmin):
    pass
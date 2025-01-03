from django.contrib import admin

from utils.admin import BaseAdmin
from .models import ContactDetail


@admin.register(ContactDetail)
class ContactDetailAdmin(BaseAdmin):
    list_display = ('subject', 'name', 'email', 'phone',)

from django.contrib import admin

from utils.admin import BaseAdmin
from .models import Course, CourseEnrollment


@admin.register(Course)
class CourseAdmin(BaseAdmin):
    pass


@admin.register(CourseEnrollment)
class CourseEnrollmentAdmin(BaseAdmin):
    pass

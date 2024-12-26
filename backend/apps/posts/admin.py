from django.contrib import admin
from django.urls import reverse_lazy
from django.utils.html import format_html

from utils.admin import BaseAdmin
from .models import (PostComment, Post, PostCategory,)


@admin.register(Post)
class PostAdmin(BaseAdmin):
    list_display = ('title', 'slug', 'status',)
    list_filter = ("status", 'category')
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}


@admin.register(PostComment)
class PostCommentAdmin(BaseAdmin):
    list_display = ('title', 'message',)
    search_fields = ['message']


@admin.register(PostCategory)
class PostCategoryAdmin(BaseAdmin):
    list_display = ('title', 'slug',)
    search_fields = ['title', ]

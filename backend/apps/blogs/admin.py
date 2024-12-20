from django.contrib import admin
from django.urls import reverse_lazy
from django.utils.html import format_html

from utils.admin import BaseAdmin
from .models import (BlogComment, BlogPost, BlogPostCategory,
                     SiteDocument)


@admin.register(BlogPost)
class BlogAdmin(BaseAdmin):
    list_display = ('title', 'slug', 'status',)
    list_filter = ("status", 'category')
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}


@admin.register(BlogComment)
class BlogCommentAdmin(BaseAdmin):
    list_display = ('title', 'message',)
    search_fields = ['message']


@admin.register(BlogPostCategory)
class BlogPostCategoryAdmin(BaseAdmin):
    list_display = ('title', 'slug',)
    search_fields = ['title', ]


@admin.register(SiteDocument)
class SiteDocumentAdmin(BaseAdmin):
    add_form_template = 'admin/blogs/sitedocument/change_form.html'
    change_form_template = 'admin/blogs/sitedocument/change_form.html'
    readonly_fields = ('preview_url',)
    list_display = ('title', )
    search_fields = ['title']

    def preview_url(self, obj):
        link = reverse_lazy('dgjs_get_template', kwargs={"pk": obj.id, })
        return format_html(f"<a href=\"{link}?response=html\">{link}</a>")

    def get_fieldsets_dict(self, request, obj=None):
        default_fieldsets_dict = super().get_fieldsets_dict(request, obj)
        default_fieldsets_dict[self.lookup_general_key]["value"]["fields"] = ["title"]
        if obj is None:
            return default_fieldsets_dict
        default_fieldsets_dict.update(
            {
                "content": {
                    "label": "Content",
                    "value": {
                        "fields": (
                            "use_ssr_render",
                            "preview_url",
                            "html",
                        ),
                    }
                }
            },
        )
        self.lookup_key_list = [self.lookup_general_key, "content", self.lookup_important_dated_key, ]
        return default_fieldsets_dict

from django.urls import path

from .views import (BlogListApiView, BlogDetailApiView, SiteDocumentDetailApiView)

app_name = 'blogs'

urlpatterns = [
    path('api/v1/blogs/', BlogListApiView.as_view(), name='blog-list-api'),
    path('api/v1/blogs/<slug:slug>/', BlogDetailApiView.as_view(), name='blog-retrieve-api'),
    path('api/v1/site-document/<int:pk>/', SiteDocumentDetailApiView.as_view(), name='site-document-retrieve-api'),
]

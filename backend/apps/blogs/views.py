from django.db.models import Prefetch
from django.http import HttpResponse
from django.template import Context, Template
from django_grapesjs.utils import apply_string_handling
from rest_framework import generics
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import BlogComment, BlogPost, SiteDocument, UserModel
from .permissions import IsBlogCommentOwner
from .serializers import BlogCommentSerializer, BlogPostListSerializer, BlogPostRetrieveSerializer
from ..products.models import ProductCategory


class BlogListApiView(generics.ListAPIView):
    queryset = BlogPost.objects.all().order_by('-updated_at')
    serializer_class = BlogPostListSerializer

    def get_queryset(self):
        return BlogPost.objects.prefetch_related(
            Prefetch('author', queryset=UserModel.objects.filter(is_active=True)),
            Prefetch('category', queryset=ProductCategory.objects.filter(is_active=True)),
        ).filter(is_active=True)


class BlogDetailApiView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostRetrieveSerializer
    lookup_field = 'slug'


# class DeleteCommentView(generics.DestroyAPIView):
#     queryset = BlogComment.objects.all()
#     serializer_class = BlogCommentSerializer
#     permission_classes = [IsAuthenticated, IsBlogCommentOwner]
#     lookup_field = 'pk'


class SiteDocumentDetailApiView(RetrieveAPIView):
    queryset = SiteDocument.objects.all()

    def retrieve(self, request, *args, **kwargs):
        use_html_response = request.GET.get('response', None)
        instance: SiteDocument = self.get_object()
        html = instance.html
        if instance.use_ssr:
            template = Template(html)
            context = Context({})
            rendered_html = template.render(context)
            html = apply_string_handling(rendered_html)
        if use_html_response == 'html':
            return HttpResponse(html)
        else:
            return Response({
                "html": html,
            })

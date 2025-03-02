from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from apps.admin_dashboard.admin import CustomAdminSite

admin.site.__class__ = CustomAdminSite

urlpatterns = [
    path('dd/admin/', admin.site.urls),
    path('', include('apps.admin_dashboard.urls', namespace='admin_dashboard')),
    path('', include('apps.accounts.api.urls', namespace='accounts')),
    # path('', include('apps.posts.urls', namespace='posts')),
    # path('', include('apps.products.urls', namespace='products')),
    # path('', include('apps.contact_us.urls', namespace='contact_us')),
    # path('', include('app.cart.urls')),
    # path('_checkout/', include('_checkout.urls')),
]

if settings.DEBUG:
    import debug_toolbar

    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
    urlpatterns += path('__debug__/', include(debug_toolbar.urls)),

    # urlpatterns += path("__reload__/", include("django_browser_reload.urls")),

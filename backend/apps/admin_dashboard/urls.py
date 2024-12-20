from django.urls import path

from .views import AdminUserNotificationListApiView
# , AdminFileUploadApiView, AdminFileRemoveApiView

app_name = 'admin_dashboard'

urlpatterns = [
    path('api/v1/admin/notifications/my/', AdminUserNotificationListApiView.as_view(),
         name='user-notification-list-my-api'),
    # path('api/v1/admin/file-upload/', AdminFileUploadApiView.as_view(),
    #      name='file-upload-api'),
    # path('api/v1/admin/file-remove/', AdminFileRemoveApiView.as_view(),
    #      name='file-remove-api'),
]

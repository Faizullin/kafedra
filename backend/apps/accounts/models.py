from django.contrib.auth.models import AbstractUser
from django_softdelete.models import SoftDeleteModel

from utils.models import AbstractTimestampedModel, models
from .fields import AvatarField


class UserApprovalStatus(models.TextChoices):
    APPROVED = ('approved', 'Approved')
    REJECTED = ('rejected', 'Rejected')
    PENDING = ('pending', 'Pending')


class CustomUser(AbstractUser, SoftDeleteModel):
    approval_status = models.CharField(
        max_length=10,
        choices=UserApprovalStatus.choices,
        default=UserApprovalStatus.PENDING,
    )
    avatar = AvatarField(null=True, blank=True,)
    is_student = models.BooleanField(default=False)


UserModel = CustomUser


class UserProfile(AbstractTimestampedModel, SoftDeleteModel):
    user = models.OneToOneField(UserModel, on_delete=models.CASCADE, related_name='profile', db_index=True)
    bio = models.TextField(blank=True)
    headline = models.CharField(max_length=255, blank=True)
    location = models.CharField(max_length=100, blank=True)
    is_private = models.BooleanField(default=False)

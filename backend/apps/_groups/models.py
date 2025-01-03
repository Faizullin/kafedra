from django.conf import settings
from django.contrib.contenttypes.fields import GenericRelation
from django.db import models

from apps.attachments.models import Attachment
from apps.posts.models import Category, PublicationStatus
from utils.models import AbstractTimestampedModel


class Group(AbstractTimestampedModel):
    name = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(Category, null=True, blank=True, on_delete=models.SET_NULL)
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, through='GroupMembership', related_name='user_groups',
                                     db_index=True)
    publication_date = models.IntegerField(choices=PublicationStatus.choices, default=PublicationStatus.DRAFT)
    # privacy_level = models.CharField(max_length=20, choices=[('low', 'Low'), ('medium', 'Medium'), ('high', 'High')],
    #                                  default='medium')
    # tags = models.CharField(max_length=100, blank=True)
    cover_image = GenericRelation(Attachment)

    # shares = models.ManyToManyField(Share, related_name='group_shares', blank=True, db_index=True)
    # tags = TaggableManager()

    def __str__(self):
        return self.name


class GroupMembership(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=[('admin', 'Admin'), ('member', 'Member')], default='member')
    joined_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.user.username} in {self.group.name}"

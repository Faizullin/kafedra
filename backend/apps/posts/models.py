from django.contrib.auth import get_user_model
from django.db import models
from django.template.defaultfilters import slugify
from django.utils.translation import gettext_lazy as _
# from django_grapesjs.models import GrapesJsHtmlField
from django_softdelete.models import SoftDeleteModel

from utils.models import AbstractTimestampedModel, AbstractMetaModel

UserModel = get_user_model()


class PostCategory(AbstractTimestampedModel):
    title = models.CharField(_("Title"), max_length=200)
    slug = models.SlugField(_("Slug"), max_length=200, unique=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        return super().save(*args, **kwargs)

    def __str__(self):
        return '{}'.format(self.title)


class PostStatus(models.IntegerChoices):
    DRAFT = 0, "Draft"
    PUBLISH = 1, "Publish"


class Post(AbstractTimestampedModel, AbstractMetaModel, SoftDeleteModel):
    title = models.CharField(_("Title"), max_length=200)
    slug = models.SlugField(_("Slug"), max_length=200, unique=True)
    author = models.ForeignKey(UserModel, on_delete=models.CASCADE,
                               related_name='post_posts')
    category = models.ForeignKey(
        PostCategory, null=True, blank=True, on_delete=models.SET_NULL)
    content = models.TextField()
    meta_data = models.TextField()
    status = models.IntegerField(
        choices=PostStatus.choices, default=PostStatus.DRAFT)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        return super().save(*args, **kwargs)

    def __str__(self):
        return '{}, {}'.format(self.title,
                               self.category)


class PostComment(AbstractTimestampedModel):
    post = models.ForeignKey(Post, null=True, blank=True, on_delete=models.SET_NULL, related_name="comments", )
    author = models.ForeignKey(UserModel, null=True, blank=True, on_delete=models.SET_NULL, related_name="comments", )
    title = models.CharField(_("Title"), max_length=50)
    message = models.TextField(_("Message"), max_length=500)

    def __str__(self):
        return '{}, {}, {}'.format(self.post, self.author, self.title)


# class SiteDocument(AbstractTimestampedModel, AbstractMetaModel, SoftDeleteModel):
#     title = models.CharField(max_length=100)
#     html = GrapesJsHtmlField()

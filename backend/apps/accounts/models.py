from django.contrib.auth.models import AbstractUser
from django_softdelete.models import SoftDeleteModel
from filer.fields.image import FilerImageField

from utils.models import AbstractTimestampedModel, models


class CustomUser(AbstractUser, SoftDeleteModel):
    pass


class UserProfile(AbstractTimestampedModel, SoftDeleteModel):
    user = models.OneToOneField(
        CustomUser, null=True, blank=True, on_delete=models.SET_NULL, related_name="profile")
    default_email = models.EmailField(max_length=254, null=False, blank=False)
    default_postcode = models.CharField(max_length=20, null=False, blank=True)
    default_town_or_city = models.CharField(max_length=40, null=False,
                                            blank=True)
    default_address_line_1 = models.CharField(max_length=80, null=False,
                                              blank=True)
    default_address_line_2 = models.CharField(max_length=80, null=False,
                                              blank=True)
    default_county = models.CharField(max_length=80, null=False, blank=True)
    # image = FilerImageField(null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return '{}, {}'.format(self.user,
                               self.default_email)

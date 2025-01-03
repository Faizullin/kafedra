from utils.models import models, AbstractTimestampedModel


class Country(AbstractTimestampedModel):
    name = models.CharField(max_length=255)

    def __str__(self):
        return "{}) {}".format(self.pk, self.name)


class City(AbstractTimestampedModel):
    name = models.CharField(max_length=255)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='cities')

    def __str__(self):
        return "{}) {}".format(self.pk, self.name)


class OrganizationType(AbstractTimestampedModel):
    name = models.CharField(max_length=200)
    description = models.TextField(max_length=1023, null=True)

    def __str__(self):
        return "{}) {}".format(self.pk, self.name)


class Organization(AbstractTimestampedModel):
    name = models.CharField(max_length=200)
    organization_type = models.ForeignKey(OrganizationType, on_delete=models.CASCADE, related_name='organizations')
    description = models.TextField(max_length=1023, null=True)

    def __str__(self):
        return "{}) {}".format(self.pk, self.name)

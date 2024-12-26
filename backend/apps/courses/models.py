from utils.models import AbstractTimestampedModel, models

class Course(AbstractTimestampedModel):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1023)

    def __str__(self):
        return '{}) {}'.format(self.pk, self.title)


class AcademicSession(AbstractTimestampedModel):
    days = models.PositiveIntegerField(null=True)

    def __str__(self):
        return '{}) {} days'.format(self.pk, self.days)
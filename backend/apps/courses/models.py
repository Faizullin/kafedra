from django.contrib.auth import get_user_model

from apps.posts.models import Category
from utils.models import AbstractTimestampedModel, models, AbstractSlugModel

UserModel = get_user_model()


class AcademicSemester(AbstractTimestampedModel):
    name = models.CharField(max_length=100, null=True)
    days = models.PositiveIntegerField(null=True)
    year = models.PositiveIntegerField(null=True)
    is_current_semester = models.BooleanField(default=False, blank=True, null=True)

    def __str__(self):
        return '[{}] {} days'.format(self.pk, self.days)


class Program(AbstractTimestampedModel, AbstractSlugModel):
    title = models.CharField(max_length=150, unique=True)
    summary = models.TextField(null=True, blank=True)

    def __str__(self):
        return '[{}] {}'.format(self.pk, self.title)


class Course(AbstractTimestampedModel, AbstractSlugModel):
    title = models.CharField(max_length=200)
    code = models.CharField(max_length=20, unique=True, null=True)
    credit = models.IntegerField(null=True, default=0)
    duration_hours = models.PositiveIntegerField(help_text="Estimated time for learning the main parts in hours.")
    duration_weeks = models.PositiveIntegerField(help_text="Duration of the course in weeks.")

    prerequisites = models.TextField(help_text="Requirements for prior subjects or intended audience.")
    keywords = models.TextField(help_text="Comma-separated keywords.")
    abbreviations = models.TextField(help_text="List of abbreviations and their meanings.", blank=True)
    objective = models.TextField(help_text="Purpose or aim of the course.")
    summary = models.TextField(help_text="General summary of the course.")
    software_requirements = models.TextField(help_text="Required software, tools, or websites.")


    semester = models.ForeignKey(AcademicSemester, null=True, blank=True, on_delete=models.SET_NULL)
    owner = models.ForeignKey(UserModel, null=True, blank=True, related_name='courses', on_delete=models.SET_NULL)
    category = models.ForeignKey(Category, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return '[{}] {}'.format(self.pk, self.title)


class CourseEnrollment(models.Model):
    course = models.ForeignKey(Course, related_name='enrolled_courses', on_delete=models.CASCADE)
    student = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    enrolled = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.student.user.username} enrolled in {self.course.title}"

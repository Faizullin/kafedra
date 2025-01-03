from django.contrib.auth import get_user_model

from utils.models import models, AbstractTimestampedModel

UserModel = get_user_model()


class SubscriptionPlan(AbstractTimestampedModel):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration_days = models.IntegerField()  # Duration in days

    def __str__(self):
        return self.name

class Subscription(AbstractTimestampedModel):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='_subscriptions')
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.CASCADE, related_name='_subscriptions')
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    def __str__(self):
        return f'{self.user.username} - {self.plan.name}'
from django.apps import AppConfig


class CheckoutConfig(AppConfig):
    name = 'apps._checkout'

    def ready(self):
        import apps._checkout.signals

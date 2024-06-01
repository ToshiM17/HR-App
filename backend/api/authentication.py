from datetime import timedelta
from django.conf import settings
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.authentication import TokenAuthentication
from rest_framework import exceptions

EXPIRE_TIME = getattr(settings, 'REST_FRAMEWORK_TOKEN_EXPIRE_MINUTES', 1440) # 24h

class ExpiringTokenAuthentication(TokenAuthentication):
    def authenticate_credentials(self, key):
        try:
            token = self.get_model().objects.select_related('user').get(key=key)
        except ObjectDoesNotExist:
            raise exceptions.AuthenticationFailed(_('Invalid token.'))

        if not token.user.is_active:
            raise exceptions.AuthenticationFailed(_('User inactive or deleted.'))

        if token.created < timezone.now() - timedelta(minutes=EXPIRE_TIME):
            raise exceptions.AuthenticationFailed(_('Token has expired.'))

        return (token.user, token)
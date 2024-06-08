from django.db import models
from django.contrib.auth.models import AbstractUser, Group
from django.utils.translation import gettext_lazy as _

# Create your models here.

class User(AbstractUser):
    GROUPS = (
        ('admins', 'admins',),
        ('users', 'users',),
    )

    salary = models.DecimalField(verbose_name=_('Salary'), max_digits=6, decimal_places=2, null=True, blank=True)
    group_name = models.CharField(choices=GROUPS, default='users', max_length=10)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        try:
            group = Group.objects.get(name=self.group_name)
            self.groups.set([group])
        except Group.DoesNotExist:
            pass

        super().save(*args, **kwargs)
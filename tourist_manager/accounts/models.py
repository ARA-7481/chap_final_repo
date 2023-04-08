from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    ACCOUNT_TYPES =  (
        ('staff_only','staff_only'),
        ('office_admin','office_admin'),
    )
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    account_type = models.CharField(max_length=20, choices=ACCOUNT_TYPES, default='staff_only')

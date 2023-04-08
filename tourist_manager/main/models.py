from django.db import models
from django.contrib.auth.models import User
import random
import string

def random_code_generator(length=10):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))
    
class LogDetails(models.Model):
    log_code = models.CharField(max_length=10, primary_key=True, unique=True, default=random_code_generator, editable=False)
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)
    added_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, to_field='username')

class Tourist(models.Model):
    GENDER = (
        ('male','male'),
        ('female','female'),
    )
    unique_id = models.CharField(max_length=10, primary_key=True, unique=True, default=random_code_generator, editable=False)
    name = models.CharField(max_length=100, null=True)
    age = models.PositiveIntegerField(null=True)
    gender = models.CharField(max_length=20, null=True, choices=GENDER)
    address = models.CharField(max_length=200, null=True)
    contact_number = models.CharField(max_length=20, null=True)
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)
    added_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, to_field='username')

class Vehicle(models.Model):
    CLASSIFICATION = (
        ('private','private'),
        ('public','public'),
    )
    TYPE = (
        ('van','van'),
        ('bus','bus'),
        ('motorcycle','motorcycle'),
        ('pick-up','pick-up'),
        ('suv','suv'),
        ('car','car'),
        ('others','others'),
    )
    vehicle_id = models.CharField(max_length=10, primary_key=True, unique=True, default=random_code_generator, editable=False)
    plate_number = models.CharField(max_length=20)
    drivers = models.ForeignKey(Tourist, on_delete=models.SET_NULL, null=True, related_name='vehicle_used')
    vehicle_classification = models.CharField(max_length=20, choices=CLASSIFICATION)
    vehicle_type = models.CharField(max_length=20, choices=TYPE)
    passenger_count = models.PositiveIntegerField()
    passengers = models.ManyToManyField(Tourist)
    description = models.TextField(null=True)
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)
    added_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, to_field='username')


from django.db import models
from datetime import datetime
from django.contrib.auth.models import User
import random
import string

def random_code_generator(length=3):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def transaction_code_generator(length=15):
    current_date = datetime.now().strftime('%Y%m%d')
    in_between = "-"
    vehicle_count = Vehicle.objects.count()
    vehicle_count_str = str(vehicle_count).zfill(5)
    vehicle_unique_code = random_code_generator()
    return f'{current_date}{in_between}{vehicle_count_str}{in_between}{vehicle_unique_code}'
    
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
    vehicle_id = models.CharField(max_length=10, primary_key=True, unique=True, default=transaction_code_generator, editable=False)
    plate_number = models.CharField(max_length=20)
    drivers = models.ForeignKey(Tourist, on_delete=models.SET_NULL, null=True, related_name='vehicle_used')
    vehicle_classification = models.CharField(max_length=20, choices=CLASSIFICATION)
    vehicle_type = models.CharField(max_length=20, choices=TYPE)
    passenger_count = models.PositiveIntegerField()
    passengers = models.ManyToManyField(Tourist)
    description = models.TextField(null=True)
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)
    passenger_count_domestic = models.PositiveIntegerField(null=True)
    passenger_count_local = models.PositiveIntegerField(null=True)
    passenger_count_international = models.PositiveIntegerField(null=True)
    domestic_bill = models.PositiveIntegerField(null=True)
    local_bill = models.PositiveIntegerField(null=True)
    international_bill = models.PositiveIntegerField(null=True)
    total_bill = models.FloatField(null=True)
    added_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, to_field='username')
    status = models.CharField(max_length=10, default="Not Used", null=True)

class Rates(models.Model):
    domestic_rate = models.PositiveIntegerField()
    local_rate = models.PositiveIntegerField()
    international_rate = models.PositiveIntegerField()
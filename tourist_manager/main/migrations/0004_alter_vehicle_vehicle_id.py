# Generated by Django 4.2 on 2023-05-04 01:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_rates'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vehicle',
            name='vehicle_id',
            field=models.CharField(editable=False, max_length=20, primary_key=True, serialize=False, unique=True),
        ),
    ]

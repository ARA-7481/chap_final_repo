# Generated by Django 4.2 on 2023-04-24 17:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='account_type',
            field=models.CharField(choices=[('staff_only', 'staff_only'), ('office_admin', 'office_admin'), ('', '')], default='staff_only', max_length=20),
        ),
    ]
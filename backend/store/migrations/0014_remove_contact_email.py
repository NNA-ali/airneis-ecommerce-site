# Generated by Django 4.2 on 2024-05-23 10:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0013_contact'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='contact',
            name='email',
        ),
    ]

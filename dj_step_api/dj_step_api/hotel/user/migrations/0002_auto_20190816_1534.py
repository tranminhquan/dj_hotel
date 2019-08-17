# Generated by Django 2.2.3 on 2019-08-16 08:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='billing',
            name='paid',
        ),
        migrations.AlterField(
            model_name='billing',
            name='electricity_start_num',
            field=models.IntegerField(default=0, editable=False),
        ),
        migrations.AlterField(
            model_name='billing',
            name='water_start_num',
            field=models.IntegerField(default=0, editable=False),
        ),
    ]

# Generated by Django 4.0.6 on 2022-07-17 10:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mos', '0006_alter_point_level'),
    ]

    operations = [
        migrations.AlterField(
            model_name='point',
            name='name',
            field=models.CharField(max_length=150, unique=True),
        ),
    ]

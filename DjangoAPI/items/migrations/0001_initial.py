# Generated by Django 4.2.19 on 2025-06-16 17:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Items',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('group', models.CharField(choices=[('Primary', 'Primary'), ('Secondary', 'Secondary')], max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.AddConstraint(
            model_name='items',
            constraint=models.UniqueConstraint(fields=('name', 'group'), name='unique_name_in_group'),
        ),
    ]

# Generated by Django 4.2 on 2024-02-29 02:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_rename_category_product_category_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='gallery',
            options={'verbose_name_plural': 'Product Images'},
        ),
        migrations.AddField(
            model_name='size',
            name='dimensions',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=9),
        ),
    ]
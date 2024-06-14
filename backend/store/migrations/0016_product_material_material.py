# Generated by Django 4.2 on 2024-06-07 13:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0015_alter_contact_message'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='material',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.CreateModel(
            name='Material',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=1000)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='materials', to='store.product')),
            ],
        ),
    ]
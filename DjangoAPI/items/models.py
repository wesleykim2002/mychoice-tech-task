from django.db import models

# Create your models here.
class Items(models.Model):
    ITEM_GROUPS = [
        ('Primary', 'Primary'),
        ('Secondary', 'Secondary')
    ]

    name = models.CharField(max_length = 255)
    group = models.CharField(max_length = 255, choices=ITEM_GROUPS) # another option for groups is to create a relational detabase (foreign key setup)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['name', 'group'], name='unique_name_in_group')
        ]
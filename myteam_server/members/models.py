from django.db import models

# Create your models here.

class TeamMember(models.Model):
    ROLE_CHOICES = [
        ('Regular', 'Regular'),
        ('Admin', 'Admin'),
    ]
    
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_no = models.CharField(max_length=20)
    role = models.CharField(max_length=7, choices=ROLE_CHOICES, default='Regular')
    location = models.CharField(max_length=200, blank=True, null=True)
    interests = models.CharField(max_length=500, blank=True, null=True)
    info = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    class Meta:
        db_table = 'team_members'

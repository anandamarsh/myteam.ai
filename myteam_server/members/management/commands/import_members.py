from django.core.management.base import BaseCommand
import csv
from members.models import TeamMember

class Command(BaseCommand):
    help = 'Import team members from CSV file'

    def handle(self, *args, **kwargs):
        with open('team_members.csv', 'r') as file:
            reader = csv.DictReader(file)
            for row in reader:
                TeamMember.objects.create(
                    first_name=row['first_name'],
                    last_name=row['last_name'],
                    email=row['email'],
                    phone_no=row['phone_no'],
                    role=row['role'],
                    location=row['location'],
                    interests=row['interests'],
                    info=row['info']
                )
        self.stdout.write(self.style.SUCCESS('Successfully imported team members')) 
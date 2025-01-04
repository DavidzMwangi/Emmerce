from django.db import models
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here.

class Lead(models.Model):
    STATUS_CHOICES = [
        ('NEW', 'New'),
        ('IN_PROGRESS', 'In Progress'),
        ('QUALIFIED', 'Qualified'),
        ('UNQUALIFIED', 'Unqualified'),
        ('CONVERTED', 'Converted'),
    ]

    title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='NEW')
    estimated_value = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leads')

    def __str__(self):
        return f"{self.title} - {self.company}"

class Contact(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    position = models.CharField(max_length=100, blank=True)
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name='contacts')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Note(models.Model):
    content = models.TextField()
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name='notes')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Note for {self.lead.title} - {self.created_at.strftime('%Y-%m-%d')}"

class Reminder(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    due_date = models.DateTimeField()
    completed = models.BooleanField(default=False)
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name='reminders')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reminders')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Reminder for {self.lead.title} - Due: {self.due_date.strftime('%Y-%m-%d')}"

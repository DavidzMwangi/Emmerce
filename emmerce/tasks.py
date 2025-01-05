from celery import shared_task
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta

from api.models import Reminder


@shared_task
def send_reminder_email(reminder_id):
    try:
        reminder = Reminder.objects.get(id=reminder_id)
        subject = f'Reminder: {reminder.title}'
        message = f'''
        Reminder for lead: {reminder.lead.title}
        Due: {reminder.due_date}
        Description: {reminder.description}
        '''
        send_mail(
            subject,
            message,
            'from@example.com',
            [reminder.created_by.email],
            fail_silently=False,
        )
        return f"Reminder email sent for reminder_id: {reminder_id}"
    except Reminder.DoesNotExist:
        return f"Reminder with id {reminder_id} not found"


@shared_task
def check_reminders():
    """Check for upcoming reminders and send notifications"""
    upcoming_reminders = Reminder.objects.filter(
        completed=False,
        due_date__gte=timezone.now(),
        due_date__lte=timezone.now() + timedelta(hours=1)
    )

    for reminder in upcoming_reminders:
        send_reminder_email.delay(reminder.id)

    return f"Checked {upcoming_reminders.count()} reminders"
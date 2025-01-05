from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from django.conf import settings
from datetime import timedelta

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'emmerce.settings')

app = Celery('emmerce')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

# Configure Celery Beat schedule
app.conf.beat_schedule = {
    'check-reminders': {
        'task': 'crm.tasks.check_reminders',
        'schedule': timedelta(minutes=15),
    },
}

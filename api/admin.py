from django.contrib import admin

from api.models import Lead, Contact, Note, Reminder
from rest_framework.authtoken.admin import TokenAdmin

# Register your models here.
admin.site.register(Lead)
admin.site.register(Contact)
admin.site.register(Note)
admin.site.register(Reminder)

TokenAdmin.raw_id_fields = ['user']

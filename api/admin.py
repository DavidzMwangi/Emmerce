from django.contrib import admin

from api.models import Lead, Contact, Note, Reminder

# Register your models here.
admin.site.register(Lead)
admin.site.register(Contact)
admin.site.register(Note)
admin.site.register(Reminder)

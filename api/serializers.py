from rest_framework import serializers

from api.models import Contact, Note, Reminder, Lead


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

class NoteSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(source='created_by.username', read_only=True)

    class Meta:
        model = Note
        fields = ['id', 'content', 'lead', 'created_by', 'created_by_name', 'created_at', 'updated_at']

class ReminderSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(source='created_by.username', read_only=True)

    class Meta:
        model = Reminder
        fields = ['id', 'title', 'description', 'due_date', 'completed', 'lead',
                 'created_by', 'created_by_name', 'created_at', 'updated_at']

class LeadSerializer(serializers.ModelSerializer):
    contacts = ContactSerializer(many=True, read_only=True)
    notes = NoteSerializer(many=True, read_only=True)
    reminders = ReminderSerializer(many=True, read_only=True)
    created_by_name = serializers.CharField(source='created_by.username', read_only=True)

    class Meta:
        model = Lead
        fields = ['id', 'title', 'company', 'description', 'status', 'estimated_value',
                 'created_by', 'created_by_name', 'created_at', 'updated_at',
                 'contacts', 'notes', 'reminders']
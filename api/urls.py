from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import LoginView

router = DefaultRouter()
router.register(r'leads', views.LeadViewSet, basename='lead')
router.register(r'contacts', views.ContactViewSet, basename='contact')
router.register(r'notes', views.NoteViewSet, basename='note')
router.register(r'reminders', views.ReminderViewSet, basename='reminder')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login', LoginView.as_view(), name='login'),

]
from django.urls import path
from . import views

urlpatterns = [
    path('notes/', views.NoteListCreate.as_view(), name='note-list-create'), # List and create notes
    path('notes/<int:pk>/', views.NoteDelete.as_view(), name='note-delete'), # Delete a note
]
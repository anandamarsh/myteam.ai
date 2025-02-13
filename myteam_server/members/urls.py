from django.urls import path
from . import views

urlpatterns = [
    path('api/v1/members/', views.TeamMemberList.as_view(), name='member-list'),
    path('api/v1/members/<int:pk>/', views.TeamMemberDetail.as_view(), name='member-detail'),
]
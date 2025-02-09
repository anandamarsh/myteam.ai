from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import TeamMember
from .serializers import TeamMemberSerializer

# Create your views here.

# In-memory storage
MEMBERS = [
    {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@example.com",
        "phone_no": "1234567890",
        "role": "Admin"
    }
]

class TeamMemberViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = TeamMember.objects.all()
        serializer = TeamMemberSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            member = TeamMember.objects.get(pk=pk)
            serializer = TeamMemberSerializer(member)
            return Response(serializer.data)
        except TeamMember.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        serializer = TeamMemberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        try:
            member = TeamMember.objects.get(pk=pk)
            serializer = TeamMemberSerializer(member, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except TeamMember.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        try:
            member = TeamMember.objects.get(pk=pk)
            # Check if user making request is admin
            requesting_member = TeamMember.objects.get(email=request.headers.get('X-User-Email', ''))
            if requesting_member.role != 'Admin':
                return Response(
                    {"error": "Only admins can delete members"}, 
                    status=status.HTTP_403_FORBIDDEN
                )
            member.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except TeamMember.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

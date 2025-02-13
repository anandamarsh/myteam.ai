from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import TeamMember

# Create your tests here.

class TeamMemberTests(APITestCase):
    def setUp(self):
        # This runs before each test
        self.base_url = '/api/v1/members/'
        self.test_member = TeamMember.objects.create(
            first_name="John",
            last_name="Doe",
            email="john@example.com",
            phone_no="1234567890",
            role="Regular",
            location="New York",
            interests="Python, Django, React",
            info="Full stack developer with 5 years of experience"
        )

        # Create an admin user
        self.admin = TeamMember.objects.create(
            first_name="Admin",
            last_name="User",
            email="admin@example.com",
            phone_no="1234567890",
            role="Admin"
        )
        
        # Create a regular user
        self.regular = TeamMember.objects.create(
            first_name="Regular",
            last_name="User",
            email="regular@example.com",
            phone_no="0987654321",
            role="Regular"
        )

        self.valid_payload = {
            'first_name': 'Jane',
            'last_name': 'Smith',
            'email': 'jane@example.com',
            'phone_no': '0987654321',
            'role': 'Regular',
            'location': 'San Francisco',
            'interests': 'JavaScript, Node.js',
            'info': 'Backend developer'
        }

        self.invalid_payload = {
            'first_name': '',
            'last_name': '',
            'email': 'not-an-email',
            'phone_no': '',
            'role': 'Invalid'
        }

    def test_list_members(self):
        """Test getting list of members"""
        response = self.client.get(self.base_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(response.data, list)

    def test_create_member(self):
        """Test creating a new member"""
        response = self.client.post(self.base_url, self.test_member, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['first_name'], self.test_member['first_name'])
        self.assertIn('id', response.data)

    def test_get_member(self):
        """Test getting a specific member"""
        # First create a member
        create_response = self.client.post(self.base_url, self.test_member, format='json')
        member_id = create_response.data['id']

        # Then retrieve it
        response = self.client.get(f'{self.base_url}{member_id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], self.test_member['email'])

    def test_update_member(self):
        """Test updating a member"""
        # First create a member
        create_response = self.client.post(self.base_url, self.test_member, format='json')
        member_id = create_response.data['id']

        # Update data
        updated_data = self.test_member.copy()
        updated_data['first_name'] = "Jane"
        updated_data['email'] = "jane@example.com"

        # Perform update
        response = self.client.put(f'{self.base_url}{member_id}/', updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['first_name'], "Jane")
        self.assertEqual(response.data['email'], "jane@example.com")

    def test_delete_member(self):
        """Test deleting a member"""
        # First create a member
        create_response = self.client.post(self.base_url, self.test_member, format='json')
        member_id = create_response.data['id']

        # Delete the member (as admin)
        response = self.client.delete(
            f'{self.base_url}{member_id}/',
            HTTP_X_USER_EMAIL=self.admin.email
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Verify member is deleted
        get_response = self.client.get(f'{self.base_url}{member_id}/')
        self.assertEqual(get_response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_nonexistent_member(self):
        """Test getting a member that doesn't exist"""
        response = self.client.get(f'{self.base_url}999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_nonexistent_member(self):
        """Test deleting a member that doesn't exist"""
        response = self.client.delete(f'{self.base_url}999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_admin_can_delete_member(self):
        """Test that admin can delete members"""
        response = self.client.delete(
            f'/api/v1/members/{self.regular.id}/',
            HTTP_X_USER_EMAIL=self.admin.email
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_regular_cannot_delete_member(self):
        """Test that regular users cannot delete members"""
        response = self.client.delete(
            f'/api/v1/members/{self.admin.id}/',
            HTTP_X_USER_EMAIL=self.regular.email
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_valid_member(self):
        response = self.client.post('/api/members/', self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TeamMember.objects.count(), 2)
        self.assertEqual(response.data['location'], 'San Francisco')
        self.assertEqual(response.data['interests'], 'JavaScript, Node.js')
        self.assertEqual(response.data['info'], 'Backend developer')

    def test_create_member_with_optional_fields(self):
        payload = {
            'first_name': 'Alice',
            'last_name': 'Johnson',
            'email': 'alice@example.com',
            'phone_no': '1122334455',
            'role': 'Regular'
            # Omitting optional fields: location, interests, info
        }
        response = self.client.post('/api/members/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIsNone(response.data['location'])
        self.assertIsNone(response.data['interests'])
        self.assertIsNone(response.data['info'])

    def test_get_member_details(self):
        response = self.client.get(f'/api/members/{self.test_member.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['location'], 'New York')
        self.assertEqual(response.data['interests'], 'Python, Django, React')
        self.assertEqual(response.data['info'], 'Full stack developer with 5 years of experience')

    def test_update_member_new_fields(self):
        update_payload = {
            'location': 'London',
            'interests': 'AWS, Docker',
            'info': 'Updated profile information'
        }
        response = self.client.patch(
            f'/api/members/{self.test_member.id}/',
            update_payload,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['location'], 'London')
        self.assertEqual(response.data['interests'], 'AWS, Docker')
        self.assertEqual(response.data['info'], 'Updated profile information')

    def test_field_max_lengths(self):
        # Test maximum length constraints
        long_string = 'a' * 201  # location max_length is 200
        payload = self.valid_payload.copy()
        payload['location'] = long_string
        
        response = self.client.post('/api/members/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('location', response.data)

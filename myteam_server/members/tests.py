from rest_framework.test import APITestCase
from rest_framework import status

# Create your tests here.

class TeamMemberTests(APITestCase):
    def setUp(self):
        # This runs before each test
        self.base_url = '/api/v1/members/'
        self.test_member = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@example.com",
            "phone_no": "1234567890",
            "role": "Admin"
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

        # Delete the member
        response = self.client.delete(f'{self.base_url}{member_id}/')
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

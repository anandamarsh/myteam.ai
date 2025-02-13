from behave import given, when, then
from django.test import Client
from members.models import TeamMember
from django.urls import reverse
import json

@given('I have the following member details:')
def step_impl(context):
    context.member_data = context.table[0].as_dict()

@given('the following team member exists:')
def step_impl(context):
    data = context.table[0].as_dict()
    context.member = TeamMember.objects.create(**data)
    context.member_data = data  # Store for later comparison

@given('the following team members exist:')
def step_impl(context):
    context.members = []
    for row in context.table:
        member = TeamMember.objects.create(**row.as_dict())
        context.members.append(member)

@when('I send a POST request to create the member')
def step_impl(context):
    client = Client()
    context.response = client.post(
        '/api/v1/members/',
        data=json.dumps(context.member_data),
        content_type='application/json'
    )

@when('I send a GET request to fetch the member')
def step_impl(context):
    client = Client()
    context.response = client.get(f'/api/v1/members/{context.member.id}/')

@when('I send a GET request to fetch all members')
def step_impl(context):
    client = Client()
    context.response = client.get('/api/v1/members/')

@when('I send a DELETE request for the member')
def step_impl(context):
    client = Client()
    # Print debug info
    print(f"Attempting to delete member with ID: {context.member.id}")
    print(f"Member exists before delete: {TeamMember.objects.filter(id=context.member.id).exists()}")
    
    context.response = client.delete(
        f'/api/v1/members/{context.member.id}/',
        content_type='application/json'
    )
    
    # Print response info for debugging
    print(f"Delete response status: {context.response.status_code}")
    print(f"Delete response content: {context.response.content}")

@when('I update the member with the following details:')
def step_impl(context):
    client = Client()
    context.update_data = context.table[0].as_dict()  # Store update data
    context.response = client.put(
        f'/api/v1/members/{context.member.id}/',
        data=json.dumps(context.update_data),
        content_type='application/json'
    )

@when('I create another member with the following details:')
def step_impl(context):
    client = Client()
    context.duplicate_data = context.table[0].as_dict()  # Store duplicate data
    context.response = client.post(
        '/api/v1/members/',
        data=json.dumps(context.duplicate_data),
        content_type='application/json'
    )

@then('the response status code should be {status_code:d}')
def step_impl(context, status_code):
    assert context.response.status_code == status_code, \
        f"Expected {status_code}, got {context.response.status_code}. Response: {context.response.content}"

@then('the response should contain the member details')
def step_impl(context):
    data = context.response.json()
    member_data = context.member_data
    for key, value in member_data.items():
        assert data[key] == value, f"Mismatch for {key}: expected {value}, got {data[key]}"

@then('the response should contain the updated details')
def step_impl(context):
    data = context.response.json()
    for key, value in context.update_data.items():
        assert data[key] == value, f"Mismatch for {key}: expected {value}, got {data[key]}"

@then('the member should be deleted')
def step_impl(context):
    exists = TeamMember.objects.filter(id=context.member.id).exists()
    print(f"Member exists after delete check: {exists}")
    assert not exists, f"Member with ID {context.member.id} still exists in database"

@then('the response should contain {count:d} members')
def step_impl(context, count):
    data = context.response.json()
    assert len(data) == count, f"Expected {count} members, got {len(data)}"

@then('the response should contain email uniqueness error')
def step_impl(context):
    data = context.response.json()
    assert 'email' in data, f"Expected 'email' in error response, got {data}"
    error_message = str(data.get('email', [''])[0]).lower()
    assert 'unique' in error_message or 'already exists' in error_message, \
        f"Expected uniqueness error, got: {error_message}" 
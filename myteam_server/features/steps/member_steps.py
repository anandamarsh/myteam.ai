from behave import when, then, given
import requests
import json

@when('I request all team members')
def step_impl(context):
    context.response = requests.get(f'{context.base_url}/api/v1/members/')

@then('I should get a successful response')
def step_impl(context):
    assert context.response.status_code == 200

@then('I should get a list of members')
def step_impl(context):
    assert isinstance(context.response.json(), list)

@when('I create a new member with following details:')
def step_impl(context):
    member_data = context.table[0].as_dict()
    context.member_data = member_data
    context.response = requests.post(
        f'{context.base_url}/api/v1/members/',
        json=member_data
    )

@then('I should get a created response')
def step_impl(context):
    assert context.response.status_code == 201

@then('the member should have correct details')
def step_impl(context):
    response_data = context.response.json()
    for key in context.member_data:
        assert response_data[key] == context.member_data[key]

@then('I should see the member details')
def step_impl(context):
    response_data = context.response.json()
    assert 'first_name' in response_data
    assert 'last_name' in response_data
    assert 'email' in response_data
    assert 'phone_no' in response_data
    assert 'role' in response_data

@given('there is an existing team member')
def step_impl(context):
    member_data = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@example.com",
        "phone_no": "1234567890",
        "role": "Admin"
    }
    response = requests.post(
        f'{context.base_url}/api/v1/members/',
        json=member_data
    )
    context.member_id = response.json()['id']

@when('I request that specific member')
def step_impl(context):
    context.response = requests.get(
        f'{context.base_url}/api/v1/members/{context.member_id}/'
    )

@when('I delete that member')
def step_impl(context):
    context.response = requests.delete(
        f'{context.base_url}/api/v1/members/{context.member_id}/'
    )

@then('I should get a no content response')
def step_impl(context):
    assert context.response.status_code == 204

@then('that member should no longer exist')
def step_impl(context):
    response = requests.get(
        f'{context.base_url}/api/v1/members/{context.member_id}/'
    )
    assert response.status_code == 404

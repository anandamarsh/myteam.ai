Feature: Team Member Management
    As an API user
    I want to manage team members
    So that I can maintain the team roster

    Scenario: List all team members
        When I request all team members
        Then I should get a successful response
        And I should get a list of members

    Scenario: Create a new team member
        When I create a new member with following details:
            | first_name | last_name | email              | phone_no   | role  |
            | John       | Doe       | john@example.com   | 1234567890 | Admin |
        Then I should get a created response
        And the member should have correct details

    Scenario: Get a specific team member
        Given there is an existing team member
        When I request that specific member
        Then I should get a successful response
        And I should see the member details

    Scenario: Delete a team member
        Given there is an existing team member
        When I delete that member
        Then I should get a no content response
        And that member should no longer exist

    Scenario: Admin can delete a team member
        Given there is an admin user with email "admin@example.com"
        And there is a regular user with email "regular@example.com"
        When the admin tries to delete the regular user
        Then the deletion should be successful

    Scenario: Regular user cannot delete a team member
        Given there is an admin user with email "admin@example.com"
        And there is a regular user with email "regular@example.com"
        When the regular user tries to delete the admin
        Then the deletion should be forbidden

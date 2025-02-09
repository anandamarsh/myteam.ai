Feature: Team Member Management

  Scenario: View team members list
    Given I am on the team members page
    Then I should see the list of team members
    And I should see the total count of members

  Scenario: Add a new team member
    Given I am on the team members page
    When I click the add member button
    Then I should see the add member form
    When I fill in the member details:
      | firstName | lastName | email           | phoneNo     | role    |
      | John      | Doe      | john@email.com  | 1234567890  | Regular |
    And I click the save button
    Then I should see the member in the list

  Scenario: Edit an existing member
    Given I am on the team members page
    And there is a member "John Doe" in the list
    When I click on "John Doe"
    Then I should see the edit member form
    When I update the member details:
      | firstName | lastName | email                | phoneNo     | role  |
      | John      | Smith    | john.smith@email.com | 9876543210  | Admin |
    And I click the save button
    Then I should see the updated details in the list

  Scenario: Cancel adding a new member
    Given I am on the team members page
    When I click the add member button
    And I fill in the member details:
      | firstName | lastName | email           | phoneNo    | role    |
      | Jane      | Doe      | jane@email.com  | 5555555555 | Regular |
    And I click the cancel button
    Then I should not see "Jane Doe" in the list 
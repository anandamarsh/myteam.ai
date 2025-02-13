Feature: Team Member Management

  Scenario: Create a new team member
    Given I have the following member details:
      | first_name | last_name | email           | phone_no   | role    | location    | interests        | info                    |
      | John       | Doe       | john@email.com  | 1234567890 | Regular | New York    | Python, Django   | Full stack developer    |
    When I send a POST request to create the member
    Then the response status code should be 201
    And the response should contain the member details

  Scenario: Get all team members
    Given the following team members exist:
      | first_name | last_name | email            | phone_no   | role    | location    | interests        | info                    |
      | John       | Doe       | john@email.com   | 1234567890 | Regular | New York    | Python, Django   | Full stack developer    |
      | Jane       | Smith     | jane@email.com   | 0987654321 | Admin   | London      | React, Node.js   | Frontend specialist     |
    When I send a GET request to fetch all members
    Then the response status code should be 200
    And the response should contain 2 members

  Scenario: Get a specific team member
    Given the following team member exists:
      | first_name | last_name | email           | phone_no   | role    | location    | interests        | info                    |
      | John       | Doe       | john@email.com  | 1234567890 | Regular | New York    | Python, Django   | Full stack developer    |
    When I send a GET request to fetch the member
    Then the response status code should be 200
    And the response should contain the member details

  Scenario: Update a team member
    Given the following team member exists:
      | first_name | last_name | email           | phone_no   | role    | location    | interests        | info                    |
      | John       | Doe       | john@email.com  | 1234567890 | Regular | New York    | Python, Django   | Full stack developer    |
    When I update the member with the following details:
      | first_name | last_name | email            | phone_no   | role    | location    | interests        | info                    |
      | John       | Smith     | john@email.com   | 1234567890 | Admin   | London      | React, AWS      | Senior developer        |
    Then the response status code should be 200
    And the response should contain the updated details

  Scenario: Delete a team member
    Given the following team member exists:
      | first_name | last_name | email           | phone_no   | role    | location    | interests        | info                    |
      | John       | Doe       | john@email.com  | 1234567890 | Regular | New York    | Python, Django   | Full stack developer    |
    When I send a DELETE request for the member
    Then the response status code should be 204
    And the member should be deleted
    When I send a GET request to fetch the member
    Then the response status code should be 404

  Scenario: Try to create a member with duplicate email
    Given the following team member exists:
      | first_name | last_name | email           | phone_no   | role    | location    | interests        | info                    |
      | John       | Doe       | john@email.com  | 1234567890 | Regular | New York    | Python, Django   | Full stack developer    |
    When I create another member with the following details:
      | first_name | last_name | email           | phone_no   | role    | location    | interests        | info                    |
      | Jane       | Smith     | john@email.com  | 0987654321 | Regular | London      | React, Node.js   | Frontend developer      |
    Then the response status code should be 400
    And the response should contain email uniqueness error
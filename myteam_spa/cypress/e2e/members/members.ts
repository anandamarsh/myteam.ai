import {
  Given,
  When,
  Then,
  DataTable,
} from "@badeball/cypress-cucumber-preprocessor";

beforeEach(() => {
  // Clear existing data and set up test state
  cy.request({
    method: "GET",
    url: "http://127.0.0.1:8000/api/v1/members/",
  })
    .then((response) => {
      // Delete all existing members
      response.body.forEach((member: any) => {
        cy.request({
          method: "DELETE",
          url: `http://127.0.0.1:8000/api/v1/members/${member.id}/`,
          headers: {
            "X-User-Email": "admin@example.com",
          },
          failOnStatusCode: false, // This will prevent 404 errors from failing the test
        });
      });
    })
    .then(() => {
      // Create admin user after clearing data
      cy.request({
        method: "POST",
        url: "http://127.0.0.1:8000/api/v1/members/",
        body: {
          first_name: "Admin",
          last_name: "User",
          email: "admin@example.com",
          phone_no: "1234567890",
          role: "Admin",
        },
        failOnStatusCode: false,
      });
    });
});

Given("I am on the team members page", () => {
  cy.visit("/");
  // Wait for the page to load
  cy.get("[data-testid=member-list]", { timeout: 10000 }).should("exist");
});

Then("I should see the list of team members", () => {
  cy.get("[data-testid=member-list]").should("exist");
});

Then("I should see the total count of members", () => {
  cy.get("[data-testid=member-count]").should("exist");
});

When("I click the add member button", () => {
  cy.get("[data-testid=add-member-button]").click();
});

Then("I should see the add member form", () => {
  cy.get("[data-testid=member-form]").should("exist");
});

When("I fill in the member details:", (dataTable: DataTable) => {
  const data = dataTable.hashes()[0];
  cy.get("[data-testid=firstName-input] input").type(data.firstName);
  cy.get("[data-testid=lastName-input] input").type(data.lastName);
  cy.get("[data-testid=email-input] input").type(data.email);
  cy.get("[data-testid=phoneNo-input] input").type(data.phoneNo);
  cy.get(`[data-testid=role-${data.role.toLowerCase()}-radio]`).click();
});

When("I click the save button", () => {
  // Don't wait for both requests, just wait for the response
  cy.intercept("POST", "http://127.0.0.1:8000/api/v1/members/").as(
    "memberRequest"
  );
  cy.intercept("PUT", "http://127.0.0.1:8000/api/v1/members/*").as(
    "memberRequest"
  );
  cy.get("[data-testid=save-button]").click();
  cy.wait("@memberRequest", { timeout: 10000 });
});

Then("I should see the member in the list", () => {
  // Wait for the list view to be visible again
  cy.get("[data-testid=member-list]", { timeout: 10000 }).should("be.visible");
  cy.get("[data-testid=member-list]").should("contain", "John Doe");
});

Given("there is a member {string} in the list", (fullName: string) => {
  const [firstName, lastName] = fullName.split(" ");
  // Wait for the request to complete before continuing
  cy.request({
    method: "POST",
    url: "http://127.0.0.1:8000/api/v1/members/",
    body: {
      first_name: firstName,
      last_name: lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone_no: "1234567890",
      role: "Regular",
    },
    failOnStatusCode: false,
  }).then(() => {
    cy.visit("/");
    // Wait for the list to be visible
    cy.get("[data-testid=member-list]", { timeout: 10000 }).should(
      "be.visible"
    );
  });
});

When("I click on {string}", (fullName: string) => {
  cy.contains(fullName).click();
});

When("I update the member details:", (dataTable: DataTable) => {
  const data = dataTable.hashes()[0];
  cy.get("[data-testid=member-form]").should("be.visible");
  cy.get("[data-testid=firstName-input] input").clear().type(data.firstName);
  cy.get("[data-testid=lastName-input] input").clear().type(data.lastName);
  cy.get("[data-testid=email-input] input").clear().type(data.email);
  cy.get("[data-testid=phoneNo-input] input").clear().type(data.phoneNo);
  cy.get(`[data-testid=role-${data.role.toLowerCase()}-radio]`).click();
});

Then("I should see the updated details in the list", () => {
  cy.get("[data-testid=member-list]").should("contain", "John Smith");
  cy.get("[data-testid=member-list]").should("contain", "john.smith@email.com");
});

When("I click the cancel button", () => {
  cy.get("[data-testid=cancel-button]").click();
});

Then("I should not see {string} in the list", (name: string) => {
  cy.get("[data-testid=member-list]").should("not.contain", name);
});

Given("I am logged in as an admin", () => {
  // Wait for admin setup to complete
  cy.request({
    method: "POST",
    url: "http://127.0.0.1:8000/api/v1/members/",
    body: {
      first_name: "Admin",
      last_name: "User",
      email: "admin@example.com",
      phone_no: "1234567890",
      role: "Admin",
    },
    failOnStatusCode: false,
  }).then(() => {
    cy.window()
      .its("localStorage")
      .invoke("setItem", "userEmail", "admin@example.com");
    cy.visit("/");
    cy.get("[data-testid=member-list]", { timeout: 10000 }).should(
      "be.visible"
    );
  });
});

Given("I am logged in as a regular user", () => {
  // Create regular user and wait for completion
  cy.request({
    method: "POST",
    url: "http://127.0.0.1:8000/api/v1/members/",
    body: {
      first_name: "Regular",
      last_name: "User",
      email: "regular@example.com",
      phone_no: "1234567890",
      role: "Regular",
    },
    failOnStatusCode: false,
  }).then(() => {
    cy.window()
      .its("localStorage")
      .invoke("setItem", "userEmail", "regular@example.com");
    cy.visit("/");
    cy.get("[data-testid=member-list]", { timeout: 10000 }).should(
      "be.visible"
    );
  });
});

When("I click the delete button", () => {
  cy.get("[data-testid=delete-button]").click();
});

Then("I should not see the delete button", () => {
  // Wait for form to be fully loaded and check role-based visibility
  cy.get("[data-testid=member-form]", { timeout: 10000 }).should("be.visible");
  cy.wait(1000); // Wait for role check to complete
  cy.get("[data-testid=delete-button]").should("not.exist");
});

Then("I should see validation errors", () => {
  // Click save without filling any fields
  cy.get("[data-testid=save-button]").click();
  // Wait for validation to complete
  cy.wait(1000);
  // Check for error states in input wrappers
  cy.get("[data-testid=firstName-input]").within(() => {
    cy.get("input").should("have.class", "Mui-error");
  });
  cy.get("[data-testid=lastName-input]").within(() => {
    cy.get("input").should("have.class", "Mui-error");
  });
  cy.get("[data-testid=email-input]").within(() => {
    cy.get("input").should("have.class", "Mui-error");
  });
});

When("I fill in invalid email {string}", (email: string) => {
  cy.get("[data-testid=email-input] input").type(email);
});

Then("I should see email validation error", () => {
  cy.get("[data-testid=email-input]").within(() => {
    cy.get("input").should("have.class", "Mui-error");
    cy.get(".MuiFormHelperText-root").should("contain", "Invalid email");
  });
});

Then("I should see the edit member form", () => {
  cy.get("[data-testid=member-form]").should("exist");
  // Verify we're in edit mode
  cy.get("h5").should("contain", "Edit team member");
  cy.get("h6").should("contain", "Edit contact info, location and role");
});

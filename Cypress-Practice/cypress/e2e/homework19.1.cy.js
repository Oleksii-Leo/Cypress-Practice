describe("Registration Form Tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("Sign In", { timeout: 10000 }).click();
    cy.contains("Registration", { timeout: 5000 }).click();
  });

  it("Should show error for empty required fields", () => {
    cy.get("input#signupName", { timeout: 10000 }).focus().blur();
    cy.get("input#signupLastName", { timeout: 10000 }).focus().blur();
    cy.get("input#signupEmail", { timeout: 10000 }).focus().blur();
    cy.get("input#signupPassword", { timeout: 10000 }).focus().blur();
    cy.get("input#signupRepeatPassword", { timeout: 10000 }).focus().blur();

    //cy.contains("Register").click(); //  Это на случай если бы она была активна

    // Проверяем наличие ошибок
    cy.contains("Name required");
    cy.contains("Last name required");
    cy.contains("Email required");
    cy.contains("Password required");
    cy.contains("Re-enter password required");
  });

  it("Should show error for invalid name length and characters", () => {
    cy.get("input#signupName", { timeout: 10000 }).type("A").blur();
    cy.contains("Name has to be from 2 to 20 characters long");

    cy.get("input#signupName", { timeout: 10000 }).clear().type("!@#$$").blur();
    cy.contains("Name is invalid");
  });

  it("Should show error for invalid last name", () => {
    cy.get("input#signupLastName", { timeout: 10000 }).type("A").blur();
    cy.contains("Last name has to be from 2 to 20 characters long");

    cy.get("input#signupLastName", { timeout: 10000 })
      .clear()
      .type("1234!")
      .blur();
    cy.contains("Last name is invalid");
  });

  it("Should show error for incorrect email format", () => {
    cy.get("input#signupEmail", { timeout: 10000 }).type("invalidemail").blur();
    cy.contains("Email is incorrect");
  });

  it("Should show password validation errors", () => {
    cy.get("input#signupPassword", { timeout: 10000 }).type("short").blur();
    cy.contains("Password has to be from 8 to 15 characters long");

    cy.get("input#signupPassword", { timeout: 10000 })
      .clear()
      .type("abcdefgh")
      .blur();
    cy.contains(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
  });

  it("Should show error if passwords do not match", () => {
    cy.get("input#signupPassword", { timeout: 10000 }).type("Qwerty123").blur();
    cy.get("input#signupRepeatPassword", { timeout: 10000 })
      .type("Qwerty321")
      .blur();

    cy.contains("Passwords do not match");
  });

  it("Should successfully register with valid data", () => {
    const timestamp = Date.now();
    const testEmail = `johny${timestamp}@gmail.com`;

    cy.get("input#signupName", { timeout: 10000 }).type("John");
    cy.get("input#signupLastName", { timeout: 10000 }).type("Walker");
    cy.get("input#signupEmail", { timeout: 10000 }).type(testEmail);
    cy.get("input#signupPassword", { timeout: 10000 }).type("Qwerty123");
    cy.get("input#signupRepeatPassword", { timeout: 10000 }).type("Qwerty123");
    cy.contains("Register").click();
  });
});

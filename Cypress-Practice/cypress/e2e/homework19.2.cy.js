describe("Registration Form Field Tests", () => {
  const generateEmail = () => `johnywalker+testUser${Date.now()}@gmail.com`;

  beforeEach(() => {
    cy.visit("/");
    cy.contains("Sign In", { timeout: 10000 }).click();
    cy.contains("Registration", { timeout: 5000 }).click();
  });

  describe("Name Field", () => {
    it("Should show error for empty name", () => {
      cy.get("input#signupName").focus().blur();
      cy.contains("Name required");
    });

    it("Should show error for short name", () => {
      cy.get("input#signupName").type("A").blur();
      cy.contains("Name has to be from 2 to 20 characters long");
    });

    it("Should show error for invalid characters", () => {
      cy.get("input#signupName").clear().type("!@#$$").blur();
      cy.contains("Name is invalid");
    });

    it("Should accept valid name", () => {
      const email = generateEmail();
      cy.get("input#signupName").type("John");
      cy.get("input#signupLastName").type("Walker");
      cy.get("input#signupEmail").type(email);
      cy.get("input#signupPassword").type("Qwerty123", { sensitive: true });
      cy.get("input#signupRepeatPassword").type("Qwerty123", {
        sensitive: true,
      });
      cy.contains("Register").click();
    });
  });

  describe("Last Name Field", () => {
    it("Should show error for empty last name", () => {
      cy.get("input#signupLastName").focus().blur();
      cy.contains("Last name required");
    });

    it("Should show error for short last name", () => {
      cy.get("input#signupLastName").type("A").blur();
      cy.contains("Last name has to be from 2 to 20 characters long");
    });

    it("Should show error for invalid characters", () => {
      cy.get("input#signupLastName").clear().type("1234!").blur();
      cy.contains("Last name is invalid");
    });

    it("Should accept valid last name", () => {
      const email = generateEmail();
      cy.get("input#signupName").type("John");
      cy.get("input#signupLastName").type("Walker");
      cy.get("input#signupEmail").type(email);
      cy.get("input#signupPassword").type("Qwerty123", { sensitive: true });
      cy.get("input#signupRepeatPassword").type("Qwerty123", {
        sensitive: true,
      });
      cy.contains("Register").click();
    });
  });

  describe("Email Field", () => {
    it("Should show error for empty email", () => {
      cy.get("input#signupEmail").focus().blur();
      cy.contains("Email required");
    });

    it("Should show error for invalid format", () => {
      cy.get("input#signupEmail").type("invalidemail").blur();
      cy.contains("Email is incorrect");
    });

    it("Should accept valid email", () => {
      const email = generateEmail();
      cy.get("input#signupName").type("John");
      cy.get("input#signupLastName").type("Walker");
      cy.get("input#signupEmail").type(email);
      cy.get("input#signupPassword").type("Qwerty123", { sensitive: true });
      cy.get("input#signupRepeatPassword").type("Qwerty123", {
        sensitive: true,
      });
      cy.contains("Register").click();
    });
  });

  describe("Password Field", () => {
    it("Should show error for empty password", () => {
      cy.get("input#signupPassword").focus().blur();
      cy.contains("Password required");
    });

    it("Should show error for short password", () => {
      cy.get("input#signupPassword").type("short").blur();
      cy.contains("Password has to be from 8 to 15 characters long");
    });

    it("Should show error for lacking complexity", () => {
      cy.get("input#signupPassword").clear().type("abcdefgh").blur();
      cy.contains(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      );
    });

    it("Should accept valid password", () => {
      const email = generateEmail();
      cy.get("input#signupName").type("John");
      cy.get("input#signupLastName").type("Walker");
      cy.get("input#signupEmail").type(email);
      cy.get("input#signupPassword").type("Qwerty123", { sensitive: true });
      cy.get("input#signupRepeatPassword").type("Qwerty123", {
        sensitive: true,
      });
      cy.contains("Register").click();
    });
  });

  describe("Repeat Password Field", () => {
    it("Should show error for empty repeat password", () => {
      cy.get("input#signupRepeatPassword").focus().blur();
      cy.contains("Re-enter password required");
    });

    it("Should show error if passwords do not match", () => {
      cy.get("input#signupPassword").type("Qwerty123").blur();
      cy.get("input#signupRepeatPassword").type("Qwerty321").blur();
      cy.contains("Passwords do not match");
    });

    it("Should accept matching repeat password", () => {
      const email = generateEmail();
      cy.get("input#signupName").type("John");
      cy.get("input#signupLastName").type("Walker");
      cy.get("input#signupEmail").type(email);
      cy.get("input#signupPassword").type("Qwerty123", { sensitive: true });
      cy.get("input#signupRepeatPassword").type("Qwerty123", {
        sensitive: true,
      });
      cy.contains("Register").click();
    });
  });
});

describe("Registration Form Tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".header_signin").click();
  });

  it("succsesful sign in", () => {
    cy.get("#signinEmail").type("johnywalker2@gmail.com");
    cy.get("#signinPassword").type("Qwerty123");
    cy.get("app-signin-modal .btn-primary").click();
    cy.get("h1").should("have.text", "Garage");
  });
});

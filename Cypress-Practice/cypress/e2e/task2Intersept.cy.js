/// <reference types="cypress" />
import HomePage from "../pom/pages/HomePage";
import SignInForm from "../pom/forms/SignInForm";

describe("Intercept", () => {
  it("Intercept query", () => {
    cy.intercept("GET", "/api/cars").as("getCars");
    HomePage.visit();
    HomePage.openSignInForm();
    SignInForm.loginWithCredentials("johnywalker2@gmail.com", "Qwerty123");
    cy.get('a[href="/panel/profile"].-profile').click();

    // Проверка, что открыта страница Profile
    cy.get("h1").should("have.text", "Profile");

    cy.wait("@getCars").its("response.statusCode").should("eq", 200);
  });

  it.only("Fake response", () => {
    const fakeResponseBody = {
      status: "ok",
      data: {
        userId: 227751,
        photoFilename: "default-user.png",
        name: "Polar",
        lastName: "Bear",
      },
    };

    cy.intercept("GET", "/api/users/profile", {
      statusCode: 200,
      body: fakeResponseBody,
    }).as("getFakeProfile");

    HomePage.visit();
    HomePage.openSignInForm();
    SignInForm.loginWithCredentials("johnywalker2@gmail.com", "Qwerty123");

    cy.get('a[href="/panel/profile"].-profile').click();
    cy.wait("@getFakeProfile");

    cy.get("h1").should("have.text", "Profile");
    cy.contains("Polar");
    cy.contains("Bear");
  });
});

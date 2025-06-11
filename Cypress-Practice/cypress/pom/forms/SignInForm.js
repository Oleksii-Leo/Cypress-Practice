class SignInForm {
  get emailField() {
    return cy.get("#signinEmail");
  }

  get passwordField() {
    return cy.get("#signinPassword");
  }

  get loginButton() {
    return cy.get("app-signin-modal .btn-primary");
  }

  get wrongDataMessage() {
    return cy.contains("Wrong email or password");
  }

  get incorrectEmailMessage() {
    return cy.contains("Email is incorrect");
  }

  get emptyPasswordMessage() {
    return cy.contains("Email required");
  }
  get emptyEmailMessage() {
    return cy.contains("Password required");
  }

  enterEmail(email) {
    this.emailField.type(email);
  }

  enterPassword(password) {
    this.passwordField.type(password);
  }

  clickLoginButton() {
    this.loginButton.click();
  }

  loginWithCredentials(email, password) {
    this.enterEmail(email);
    this.enterPassword(password);
    this.clickLoginButton();
  }

  triggerEmptyErrorMessageForField(fieldName) {
    const element =
      fieldName === "email" ? this.emailField : this.passwordField;
    element.focus();
    element.blur();
  }

  verifyLoginButtonIsDisabled() {
    this.loginButton.should("be.disabled");
  }

  verifyErrorMessageForFieldIsVisible(fieldName) {
    const element =
      fieldName === "email" ? this.emailField : this.passwordField;
    element.should("be.visible");
  }

  verifyIncorrectEmailMessageIsVisible() {
    this.incorrectEmailMessage.should("be.visible");
  }

  verifyWrongDataMessageIsVisible() {
    this.wrongDataMessage.should("be.visible");
  }

  //Another option

  verifyErrorMessageIsVisible(message) {
    cy.contains(message).should("be.visible");
  }
}

export default new SignInForm();

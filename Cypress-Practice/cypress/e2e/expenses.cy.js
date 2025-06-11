import HomePage from "../pom/pages/HomePage";
import SignInForm from "../pom/forms/SignInForm";
import ExpensesPage from "../pom/pages/ExpensesPage";

describe("Add fuel expense for Fiat Panda", () => {
  beforeEach(() => {
    HomePage.visit();
    HomePage.openSignInForm();
    SignInForm.loginWithCredentials(
      Cypress.env("TEST_USER_EMAIL"),
      Cypress.env("TEST_USER_PASSWORD")
    );
  });

  it("should add fuel expense for Fiat Panda", () => {
    const baseMileage = 1200 + Math.floor(Math.random() * 100) + 1;

    const expenseData = {
      liters: 34,
      cost: 4,
      mileage: baseMileage,
    };

    ExpensesPage.openAddExpenseModalForFiatPanda();
    ExpensesPage.fillExpenseForm(expenseData);
    ExpensesPage.submitExpenseForm();
    ExpensesPage.verifyExpenseAdded(expenseData);
  });
});

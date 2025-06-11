class ExpensesPage {
  openAddExpenseModalForFiatPanda() {
    cy.contains("Fiat Panda")
      .parents(".car")
      .within(() => {
        cy.contains("Add fuel expense").click();
      });
  }

  fillExpenseForm({ liters, cost, mileage }) {
    cy.get("#addExpenseLiters").clear().type(liters);
    cy.get("#addExpenseTotalCost").clear().type(cost);
    cy.get("#addExpenseMileage").clear().type(mileage);
  }

  submitExpenseForm() {
    cy.get(".modal-content").find("button.btn-primary").contains("Add").click();
  }

  verifyExpenseAdded({ mileage, liters, cost }) {
    cy.url().should("include", "/panel/expenses");
    cy.contains(mileage);
    cy.contains(`${liters}L`);
    cy.contains(`${cost}.00 USD`);
  }
}

export default new ExpensesPage();

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// cypress/support/commands.js

// Кастомна команда login
// cypress/support/commands.js

Cypress.Commands.overwrite("type", (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    // Вимикаємо оригінальне логування для цієї команди
    options.log = false;
    // Створюємо власне логування із замаскованим повідомленням
    Cypress.log({
      $el: element,
      name: "type",
      message: "*".repeat(text.length), // Замінюємо пароль зірочками
    });
  }

  // Викликаємо оригінальну функцію `type`
  return originalFn(element, text, options);
});

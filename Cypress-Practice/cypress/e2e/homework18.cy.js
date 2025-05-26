/// <reference types="cypress" />

//describe("QAuto Website Element Tests", () => {
//beforeEach(() => {});

//it("open site", () => {
//cy.visit("https://qauto.forstudy.space", {
//auth: {
// username: "guest",
//password: "welcome2qauto",
//},
//});
//});
//});
describe("Search elements", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("by CSS selector", () => {
    cy.get("h1").should("be.visible");
  });
  //Пошук кнопки Телеграму
  it("by Telegram button selector", () => {
    cy.get(".icon-telegram").should("be.visible");
  });
  //Пошук тайтла Хіллел
  it("by Title Hillel name selector", () => {
    cy.get('a[href*="https://ithillel.ua"]').should("be.visible");
  });

  //Пошук кнопки Home
  it("by text(contains)", () => {
    cy.contains("Home");
  });

  //Пошук
  it("by mail selector", () => {
    cy.get('a[href*="mailto:developer@ithillel.ua"]').should("be.visible");
  });
});

/// <reference types="cypress" />

describe('Coding Test for QA Automation Engineers', () => {

  before(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
    cy.get('.orangehrm-login-branding').should('be.visible');
    cy.get("[alt='company-branding']").should('be.visible');
  })

  it('Created a Test Script for Login', () => {
    cy.loginAs("defaultUser");
  });

});

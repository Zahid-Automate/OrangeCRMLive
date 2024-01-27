/// <reference types="cypress" />

describe('Coding Test for QA Automation Engineers', () => {

    before(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
        cy.get('.orangehrm-login-branding').should('be.visible');
        cy.get("[alt='company-branding']").should('be.visible');
        cy.intercept("https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users?limit=50&offset=0&sortField=u.userName&sortOrder=ASC").as("adminApi");
    });

    it('Created a Test Script for Adding And Verify New User', () => {
        cy.loginAs("defaultUser");
        cy.openMenuItem("Admin");
        cy.wait("@adminApi");
        cy.AddUser("adminEnabled");
        cy.verifyUserAndDelete("adminEnabled");
        cy.wait(5000);
        cy.AddUser("adminDisabled");
        cy.verifyUserAndDelete("adminDisabled");
        cy.wait(5000);
        cy.AddUser("essEnabled");
        cy.verifyUserAndDelete("essEnabled");
        cy.wait(5000);
        cy.AddUser("essDisabled");
        cy.verifyUserAndDelete("essDisabled");
    });

    after(()=>{

    });
});

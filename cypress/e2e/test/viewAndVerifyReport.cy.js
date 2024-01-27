/// <reference types="cypress" />

describe('Coding Test for QA Automation Engineers', () => {

    before(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
        cy.get('.orangehrm-login-branding').should('be.visible');
        cy.get("[alt='company-branding']").should('be.visible');
        cy.intercept("https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users?limit=50&offset=0&sortField=u.userName&sortOrder=ASC").as("adminApi");
    })

    it('Created a Test Script for View and Verifying Report:',()=>{
        cy.loginAs("defaultUser");
        cy.openMenuItem("Admin");
        cy.wait("@adminApi");
        cy.openMenuItem("Time");
        cy.get(':nth-child(3) > .oxd-topbar-body-nav-tab-item').click({force:true});
        cy.get(':nth-child(1) > .oxd-topbar-body-nav-tab-link').click({force:true});
        cy.get('input[placeholder="Type for hints..."]').should("be.visible");
        cy.get('.oxd-autocomplete-text-input > input').type("Apache Software Foundation");
        cy.wait(3000);
        cy.get("[class=\"oxd-autocomplete-option\"]").click({force:true});

       
        /*
        * Selecting the date
        * */
    // Click second date time picker
    cy.get('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > form:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > i:nth-child(2)').click({ force:true });
   
    // Select Year
    cy.get(".oxd-calendar-selector-year").click({ force:true });
    
    cy.get("ul[role='menu']").find("li[class='oxd-calendar-dropdown--option']").each((yearList)=>{
           cy.wrap(yearList).scrollIntoView();
           if(yearList.text() === "2023"){
               cy.wrap(yearList).click();
           }
       });

    // select Date
    cy.get("[class=\"oxd-calendar-date\"]").each((dateValue)=>{
           if(dateValue.text() === "31"){
               cy.wrap(dateValue).click();
           }
       });
    // Click close button
    cy.get(".oxd-date-input-link.--close").click({force:true});

    cy.get('.oxd-button').click({force:true});

    cy.get("div[class='content-wrapper'] div:nth-child(1) div:nth-child(1)").should("be.visible").scrollIntoView();
   
    cy.get('.cell-action[data-rgcol="0"][data-rgrow="0"]').should('have.text','Bug Fixes');
    cy.get('.cell-action[data-rgcol="0"][data-rgrow="1"]').should('have.text','Feature Development');
    cy.get('.cell-action[data-rgcol="0"][data-rgrow="2"]').should('have.text','Implementation');
    cy.get('.cell-action[data-rgcol="0"][data-rgrow="3"]').should('have.text','Project Management');
    cy.get('.cell-action[data-rgcol="0"][data-rgrow="4"]').should('have.text','QA Testing');
    cy.get('.cell-action[data-rgcol="0"][data-rgrow="5"]').should('have.text','Requirement Gathering');
    cy.get('.cell-action[data-rgcol="0"][data-rgrow="6"]').should('have.text','Support & Maintanence')


 })



})
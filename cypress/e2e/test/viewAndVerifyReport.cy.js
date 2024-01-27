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
        cy.openMenuItem("Time");
        cy.get(':nth-child(3) > .oxd-topbar-body-nav-tab-item').click({force:true});
        cy.get(':nth-child(1) > .oxd-topbar-body-nav-tab-link').click({force:true});
        cy.get('input[placeholder="Type for hints..."]').should("be.visible");
        cy.get('.oxd-autocomplete-text-input > input').type("Apache Software Foundation");
        cy.wait(3000);
        cy.get("[class=\"oxd-autocomplete-option\"]").click({force:true});

       
    // First Calendar
    cy.get('.oxd-date-input > .oxd-icon').first().click(); // Click on the calendar icon of the first calendar
    cy.get('.oxd-calendar-selector-month').click(); // Click on the month selector
    cy.contains("ul[role='menu']>li", "January").click(); // Select January
    cy.get(".oxd-calendar-selector-year").click(); // Click on the year selector
    cy.contains("ul[role='menu'] li.oxd-calendar-dropdown--option", "2021").click(); // Select 2021
    cy.get("[class=\"oxd-calendar-date\"]").each((dateValue) => { // Iterate over date elements
        if (dateValue.text() === "1") { // Select the desired date (1st)
            cy.wrap(dateValue).click(); // Click on the date
        }
    });

    // Second Calendar 
    cy.get('.oxd-date-input > .oxd-icon').last().click(); // Click on the calendar icon of the second calendar
    cy.get('.oxd-calendar-selector-month').last().click(); // Click on the month selector of the second calendar
    cy.contains("ul[role='menu']>li", "December").last().click(); // Select December
    cy.get(".oxd-calendar-selector-year").click(); // Click on the year selector of the second calendar
    cy.contains("ul[role='menu'] li.oxd-calendar-dropdown--option", "2023").click(); // Select 2023
    cy.get("[class=\"oxd-calendar-date\"]").each((dateValue) => { // Iterate over date elements of the second calendar
        if (dateValue.text() === "31") { // Select the desired date (31st)
            cy.wrap(dateValue).click(); // Click on the date
        }
    });
        
    //Click on View button
    cy.get('.oxd-button').click({force:true});

    cy.intercept("https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/time/reports/data?limit=50&offset=0&projectId=3&fromDate=2021-01-01&toDate=2023-12-31&includeTimesheet=all&name=project&_dateFormattingEnabled=true").as("report");
    cy.wait("@report");

    //Assertions
    cy.get('.cell-action[data-rgcol="0"][data-rgrow="0"]').should('have.text','Bug Fixes');
    cy.get('.cell-action[data-rgcol="0"][data-rgrow="1"]').should('have.text','Feature Development');
    cy.get('.cell-action[data-rgcol="0"][data-rgrow="2"]').should('have.text','Implementation');
    cy.get('.cell-action[data-rgcol="0"][data-rgrow="3"]').should('have.text','QA Testing');
    cy.get('.cell-action[data-rgcol="0"][data-rgrow="4"]').should('have.text','Requirement Gathering');
    cy.get('.cell-action[data-rgcol="0"][data-rgrow="5"]').should('have.text','Support & Maintanence')

   

  })

})
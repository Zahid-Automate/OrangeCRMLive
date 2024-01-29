/// <reference types="cypress" />
describe('Coding Test for QA Automation Engineers', () => {
    before(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
        cy.get('.orangehrm-login-branding').should('be.visible');
        cy.get("[alt='company-branding']").should('be.visible');
        cy.intercept("https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/workweek?model=indexed").as("weekendApi");
    })

    it('Created a Test Script for add and Verifying Candidate Details:',()=>{
        cy.loginAs("defaultUser");
        cy.openMenuItem("Recruitment");
        cy.wait("@weekendApi");
        cy.get("button[class='oxd-button oxd-button--medium oxd-button--secondary']").click({force:true});
        cy.get(".oxd-text.oxd-text--h6.orangehrm-main-title").should("have.text","Add Candidate");
        cy.get("input[placeholder='First Name']").type("Cypress");
        cy.get("input[placeholder='Last Name']").type(("Automation"));
        cy.get(".oxd-icon.bi-caret-down-fill.oxd-select-text--arrow").click({force:true});
        cy.get("div[role='listbox']").find("div").each((vacancyOptions,index)=>{
            cy.wrap(vacancyOptions).scrollIntoView();
            if(vacancyOptions.text() === "Software Engineer"){
                cy.wrap(vacancyOptions).click({force:true});
            }
        });
        cy.get("input[placeholder='Type here']").eq(0).scrollIntoView();
        cy.get("input[placeholder='Type here']").eq(0).type("cypressAutomation@yopmail.com",{force:true});
        cy.get("input[placeholder='Type here']").eq(1).type("9958031039",{force:true});
        cy.get('input[type=file]').selectFile('cypress/fixtures/envs/demo/AutomationCodeTest.pdf', { action: 'drag-drop',force:true });
        //keywords
        cy.get('.orangehrm-save-candidate-page-full-width > .oxd-input-group > :nth-child(2) > .oxd-input').type("Cypress, javaScript");

        /*
        * Selecting the date
        * */

        //calendar icon
        cy.get('.oxd-date-input > .oxd-icon').click({force:true});

        //Select Month
        cy.get('.oxd-calendar-selector-month').click({force:true});
        cy.get("ul[role='menu']>li").each((calMonth,index)=>{
            cy.wrap(calMonth).scrollIntoView();
            if(calMonth.text() === "October"){
                cy.wrap(calMonth).click({force:true});
            }
        });

        // Select Year
        cy.get(".oxd-calendar-selector-year").click({force:true});
        cy.get("ul[role='menu']").find("li[class='oxd-calendar-dropdown--option']").each((yearList)=>{
            cy.wrap(yearList).scrollIntoView();
            if(yearList.text() === "2015"){
                cy.wrap(yearList).click();
            }
        });

        // select Date
        cy.get("[class=\"oxd-calendar-date\"]").each((dateValue)=>{
            if(dateValue.text() === "15"){
                cy.wrap(dateValue).click();
            }
        });
        // Click close button
        cy.get(".oxd-date-input-link.--close").click({force:true});
        //Notes
        cy.get('.oxd-textarea').type("Creating Candidate with Automation using Cypress and then will verify details and delete it.");

        //consent
        cy.get('[type="checkbox"]').check({force:true});
        cy.get('[type="checkbox"]').should("be.checked");

        //Save button
        cy.get('.oxd-button--secondary').click({force:true});

        // Wait for Page to reload and weekend API
        cy.intercept("https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/25/history?limit=50&offset=0").as("weekendApi");
        cy.wait("@weekendApi");


        // Verify the Details of Candidate
        cy.get("form[class='oxd-form'] h6[class='oxd-text oxd-text--h6 orangehrm-main-title']",{timeout: 10000}).should("be.visible");
        cy.get("div[class='oxd-grid-3 orangehrm-full-width-grid'] div:nth-child(1) div:nth-child(1) div:nth-child(2) p:nth-child(1)").should("have.text","Cypress  Automation");
        

        cy.get("div[class='orangehrm-card-container'] div[class='orangehrm-header-container']").should("be.visible").scrollIntoView();
        cy.get("div[class='oxd-input-group oxd-input-field-bottom-space'] label[class='oxd-label oxd-input-field-required']").scrollIntoView();

        cy.openMenuItem("Recruitment");
        cy.wait("@weekendApi");

        cy.get("button[class=\"oxd-icon-button\"]").eq(1).click({force:true});

        //Delete the user which was created
        cy.contains('.oxd-table-cell', 'Cypress Automation').scrollIntoView();
        cy.contains('.oxd-table-cell', 'Cypress Automation').should('exist');

        // Click on the trash icon button associated with the text "Cypress Automation"
        cy.contains('.oxd-table-cell', 'Cypress Automation')  // Locate the cell containing the text "Cypress Automation"
        .parent()                                     // Navigate to the parent element (oxd-table-row)
        .find('button[data-v-f5c763eb]:eq(1)')        // Find the trash icon button within the action buttons
        .click({force:true});                         // Click on the trash icon button

        cy.get('.oxd-button--label-danger').click({force:true});

        //Verify deletion of candidate was successful
        cy.get('.oxd-text--toast-title').should('have.text','Success')
        cy.get('.oxd-text--toast-message').should('have.text','Successfully Deleted')



    });

})

Cypress.Commands.add('loginAs', (userName) => {
    cy.log(`Log in as ${userName}`);
    cy.fixture('envs/demo/users').then((users) => {
        cy.log(users);
        cy.get("[name=\"username\"]").type(users[userName].username);
        cy.get("[name=\"password\"]").type(users[userName].password);
        cy.get("div.oxd-form-actions.orangehrm-login-action >button").click({force:true});
        cy.intercept("https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/locations").as('locationApi');
        cy.wait("@locationApi");
        cy.get("[class=\"orangehrm-dashboard-widget-name\"]").should('be.visible');
    });
});

Cypress.Commands.add('openMenuItem',(menuItem)=>{
    /**
     * Example of menuItem:
     * Admin
     * PIM
     * Leave
     * Time
     * Recruitment
     * My Info
     */
    cy.log(`Opening ${menuItem}`);
    cy.get("[class=\"oxd-icon-button oxd-main-menu-button\"]").find("i").invoke('attr','class').then((className)=>{
        cy.log("Menu class "+className);
        let isMenuOpened = false;
        if(className === "oxd-icon bi-chevron-left"){
            isMenuOpened = true;
        }else{
            isMenuOpened = false;
        }
        if(isMenuOpened){
           cy.get("ul[class=\"oxd-main-menu\"]>li>a>span").each((menuItemName)=>{
               if(menuItemName.text() === menuItem){
                   cy.wrap(menuItemName).parent().click({force:true});
               }
           })
        }
    });
})

Cypress.Commands.add('AddUser',(userType)=>{
    let addUserData;
    cy.fixture('envs/demo/addUser').then((addUsersList)=>{
         addUserData = addUsersList;
         cy.get("[class=\"oxd-button oxd-button--medium oxd-button--secondary\"]").click({force:true});
         cy.get("[class=\"oxd-text oxd-text--h6 orangehrm-main-title\"]").should("have.text","Add User");
         cy.get("div[class=\"oxd-select-text--after\"]").eq(0).click({force:true}).then(()=>{
             switch (addUserData[userType].userRole){
                 case 'Admin':{
                     cy.get("div[role='listbox'] div").eq(1).click({force:true});
                     break;
                 }
                 case 'ESS':{
                     cy.get("div[role='listbox'] div").eq(2).click({force:true});
                     break;
                 }
             }
         });

        cy.get("div[class=\"oxd-select-text--after\"]").eq(1).click({force:true}).then(()=>{
            switch (addUserData[userType].status){
                case 'Enabled':{
                    cy.get("div[role='listbox'] div").eq(1).click({force:true});
                    break;
                }
                case 'Disabled':{
                    cy.get("div[role='listbox'] div").eq(2).click({force:true});
                    break;
                }
            }
        }).then(()=>{
            cy.get("input[placeholder='Type for hints...']").type(addUserData[userType].employeeName).then(()=>{
                cy.wait(3000);
            });
            cy.get("[class=\"oxd-autocomplete-option\"]").click({force:true});
            cy.get("input[type=\"password\"]").each((passwordEl)=>{
                cy.wrap(passwordEl).type(addUserData[userType].password);
            });
            cy.get("input[class=\"oxd-input oxd-input--active\"]").eq(1).type(addUserData[userType].username);
            cy.get('.oxd-button--secondary').click();
            cy.get('.oxd-toast').should("be.visible");
            cy.get('.oxd-text--toast-title').should("be.visible");
            cy.get('.oxd-text--toast-message').should("be.visible");
            cy.intercept("https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users?limit=50&offset=0&sortField=u.userName&sortOrder=ASC").as("addUserSaveApi");
            cy.wait("@addUserSaveApi");
        });
    });
});

Cypress.Commands.add('verifyUserAndDelete',(addedUser)=>{
    cy.wait(5000);
   cy.fixture('envs/demo/addUser').then((users)=>{
      cy.get("input[class=\"oxd-input oxd-input--active\"]").eq(1).type(users[addedUser].username);
       cy.get("button[type='submit']").click({force:true}).then(()=>{
           cy.wait(5000);
           cy.get('.oxd-table-card-cell-checkbox > .oxd-checkbox-wrapper > label > .oxd-checkbox-input').should("be.visible");
           cy.get('.oxd-table-cell-actions > :nth-child(2)').should("be.visible");
       });
       cy.get('.oxd-table-card > .oxd-table-row > :nth-child(2) > div').should("contain.text",users[addedUser].username);
       cy.get('.oxd-table-card > .oxd-table-row > :nth-child(3) > div').should("contain.text",users[addedUser].userRole);
       cy.get('.oxd-table-card > .oxd-table-row > :nth-child(4) > div').should("contain.text",users[addedUser].employeeName);
       cy.get('.oxd-table-card > .oxd-table-row > :nth-child(5) > div').should("contain.text",users[addedUser].status);
   });

    cy.get('.oxd-table-cell-actions > :nth-child(1)').click({force:true});
    cy.get('.oxd-sheet').should("be.visible");
    cy.get('.orangehrm-modal-header > .oxd-text').should("be.visible");
    cy.get('.orangehrm-text-center-align > .oxd-text').should("be.visible");
    cy.get('.oxd-button--text').should("be.visible");
    cy.get('.oxd-button--label-danger').should("be.visible");
    cy.get('.oxd-button--label-danger').click({force:true});
    cy.get('.oxd-text--toast-title').should("be.visible");
    cy.get('.oxd-text--toast-title').should("have.text","Success");
    cy.get('.oxd-text--toast-message').should("be.visible");
    cy.get('.oxd-toast--info > .oxd-toast-start > .oxd-toast-content > .oxd-text--toast-title').should("be.visible");
    cy.get('.oxd-toast--info > .oxd-toast-start > .oxd-toast-content > .oxd-text--toast-message').should("be.visible");
});


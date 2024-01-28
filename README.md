Automate and verify the below basic functionalities of the OrangeHRM app.
1. Login
2. User/Candidate Creation
3. Created User/Candidate details verification
4. View and Verify the project time report

Framework structure:

| **Folder/FileName**  | **Purpose**                                                                      |
|----------------------|----------------------------------------------------------------------------------|
| e2e\test             | Includes all the test cases                                                      |
| fixtures\env\demo    | Includes json files to parameterize the tests (addUser.json and users.json)      |
| support              | Contains re-usable Cypress.commands in command.js                                |
| screenshots          | Contains screenshots when test case fails                                        |
| mocha-awesome        | Contains HTML reports generated                                                  |
| cypress.config.js    | Configuration file used by Cypress to customize its behavior and settings        |
| package.json         | Contains scripts to run the test cases and github details                        |
| .gitignore           | Contains files/folders that have to be ignored for every git commit              |

Instructions on how to run the tests are below\
**Pre-requisite**: 
Install the latest version of node.js from the link https://nodejs.org/en

**Step 1**: Clone the repository using the below command\
 git clone https://github.com/Zahid-Automate/OrangeCRMLive.git

**Step 2:** Install the required dependencies from terminal using below command\
 npm ci

**Step 3:** Use the below command from terminal to run login scenario\
npx cypress run --headed --reporter mochawesome --spec ./cypress/e2e/test/loginTest.cy.js

**Step 4:** Use the below command from terminal to run User/Candidate Creation scenario\
npx cypress run --headed --reporter mochawesome --spec cypress/e2e/test/addAndVerifyUser.cy.js",

**Step 5:** Use the below command from terminal to run User/Candidate details verification scenario\
npx cypress run --headed --reporter mochawesome --spec ./cypress/e2e/test/loginTest.cy.js

**Step 6:** Use the below command from terminal to run View and Verify the project time report scenario\
npx cypress run --headed --reporter mochawesome --spec ./cypress/e2e/test/loginTest.cy.js

**To run all the scenarios use the below command in terminal**\
npx cypress run --headed --reporter mochawesome


Reports will be visible in mocha-awesome folder present at the root of the project

In case of failure : Screen shots will be visible in cypress/screenshots folder

**Test Data Management :** Test data is managed using json present in cypress/fixtures folder based on the environment demo/dev\
addUser.json - This is used to add a user of admin or ess type with status enabled or disabled\
user.json - This is used to get the credentials for various users based on the environment (demo/dev) for login and logout with the application

**Custom commands** (Present in cypress/support/command.js)

cy.loginAs<UserType>: This command is used to login with the application\
cy.openMenuItem<MenuName>: This command is used to open any menu item present on the left-hand side after login with the application\
cy.AddUser<userType>: This command is used to add a new users \
cy.verifyUserAndDelete<addedUser>: This command is used to verify that the user was added successfully and then delete the added user

================================\
How to run Cypress in open mode\
================================\
Use the below command from terminal to run Cypress in open mode and follow the below steps
1. npx cypress open\
   => Wait for Cypress window to get opened
   <img width="946" alt="image" src="https://github.com/Zahid-Automate/OrangeCRMLive/assets/45691238/2137428f-25c7-498e-a64e-7f29f997b25f">

2. Click on ***E22 Testing***
3. Select the browser of your choice and click on ***Start E2E Testing in Chrome***
 <img width="942" alt="image" src="https://github.com/Zahid-Automate/OrangeCRMLive/assets/45691238/656b7fc4-00b4-4340-bead-4118202174d4">
 
4. From the Specs menu , click on any of the test cases present to be run 
<img width="959" alt="image" src="https://github.com/Zahid-Automate/OrangeCRMLive/assets/45691238/fa28a094-1391-4ad1-8e1d-d81c18d8cb5e">
+++
Test case results
**login test**
<img width="956" alt="image" src="https://github.com/Zahid-Automate/OrangeCRMLive/assets/45691238/a693df3c-6330-40a4-b6c5-89ad86e2596f">
**Add and verify user**
<img width="950" alt="image" src="https://github.com/Zahid-Automate/OrangeCRMLive/assets/45691238/b3586bd6-95c2-42a6-8fcd-a4b6ae04a746">
**Add and verify candidate**
<img width="958" alt="image" src="https://github.com/Zahid-Automate/OrangeCRMLive/assets/45691238/17fc55a9-9207-426b-bff0-14d8d8e1fd48">
**View and verify report**
<img width="955" alt="image" src="https://github.com/Zahid-Automate/OrangeCRMLive/assets/45691238/42f48e08-cef5-4324-9e2e-a437d498498a">




  

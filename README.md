Test the basic functionalities of the OrangeHRM app.
1. Login
2. User/Candidate Creation
3. Created User/Candidate details verification
4. View and Verify the project time report

Framework structure:
e2e : all test cases
fixtures: all environments
support folder: custom commands
configuration file : 
download folder :
screenshot folder :
mocha-awesome folder: for reports
package.json : 
gitigone : includes files that should be ignored for commit 

Instructions on how to run the tests are below\
**Pre-requisite**: 
Install the latest version of node.js from the link https://nodejs.org/en

**Step 1**: Clone the repository using the below command\
 git clone https://github.com/Zahid-Automate/OrangeCRMLive.git

**Step 2:** Install the required dependencies\
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

cy.loginAs<UserType> This command is used to login with the application\
cy.openMenuItem<MenuName> This command is used to open any menu item present on the left hand side after login with the application\
cy.AddUser<userType> This command is used to add a new user \
cy.verifyUserAndDelete<addedUser> This command is used to verify the the user was added successfully and then delete the added user

================================
How to run Cypress in open mode

Use the below command to run Cypress in open mode and follow the below steps
1. npx cypress open(Ss attach)
   => Wait for Cypress window to get opened
2. Select e2e test cases
3. Select browser of your choice
4. Click on start e2e testing in 

Screen shots attached

in open mode 
   

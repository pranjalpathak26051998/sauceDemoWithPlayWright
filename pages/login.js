const { expect } = require('@playwright/test');
require('dotenv').config();

function login(page) {
    const getUsername = page.locator('#user-name');
    const getPassword = page.locator('#password');
    const getLoginButton = page.locator('#login-button');
    return {
        async navigate() {
            await page.goto(process.env.demoUrl);
            console.log('the url is: ' + process.env.demoUrl);
            console.log('Successfully navigated to the website');
        },
        async enterEmail() {
            await getUsername.fill(process.env.demoUser);
            console.log('the user is: ' + process.env.demoUser);
            console.log('Successfully entered the username');
        },
        //create to enter Invalid email for testing
        async enterInvalidEmail() {
            await getUsername.fill('invalidUser');
            console.log('the user is: ' + 'invalidUser');
            console.log('Successfully entered the invalid username');
        },
        //create to enter Invalid password for testing
        async enterInvalidPassword(page) {
            await getPassword.fill('invalidPassword');
            console.log('the password is: ' + 'invalidPassword');
            console.log('Successfully entered the invalid password');
        },
        async enterPassword() {
            await getPassword.fill(process.env.demoPassword);
            console.log('the password is: ' + process.env.demoPassword);
            console.log('Successfully entered the password');
        },
        async clickLogin() {
            await getLoginButton.click();
            console.log('Successfully clicked the login button');
        },
        async fullLogin() {
            await this.navigate();
            await this.enterEmail();
            await this.enterPassword();
            await this.clickLogin();
            await expect(page).toHaveURL(/inventory.html/);
            console.log('Full login process successfully completed');
        },

        async fullLoginWithInvalidEmail() {
            await this.navigate();
            await this.enterInvalidEmail();
            await this.enterPassword();
            await this.clickLogin();
            await expect(page.locator("xpath=//h3[@data-test='error']")).toContainText('Epic sadface: Username and password do not match any user in this service');
            console.log('Invalid Email validation handled successfully');
        },
    };
};


module.exports = { login };
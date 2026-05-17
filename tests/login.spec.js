const { test, expect } = require('@playwright/test');
require('dotenv').config();
const { login } = require('../pages/login.js');

test.describe('Login Page Test Suite', () => {

    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = login(page); // create instance once
        await loginPage.navigate();
        console.log('Successfully navigated to the website');
    });


    // enter the email
    test('Enter the email', async () => {
        await loginPage.enterEmail();
        console.log('Email entered successfully');
    });
    //enter the password
    test('Enter the password', async () => {
        await loginPage.enterPassword();
        console.log('Password entered successfully');
    });
    // click the login button
    test('Click on the login button', async () => {
        await loginPage.clickLogin();
        console.log('Login button clicked successfully');
    });
    //test full login process
    test('Full login process', async () => {
        await loginPage.fullLogin();
        console.log('Full login process successfully completed');

    });
});
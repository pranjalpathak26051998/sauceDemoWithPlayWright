// const { test, expect } = require('@playwright/test');
// require('dotenv').config();
// //visit website and check title
// test('visit website saucedemo', async ({ page }) => {
//     await page.goto(process.env.demoUrl);
//     console.log('the url is: ' + process.env.demoUrl);
//     await page.goto(process.env.demoUrl);
//     await expect(page).toHaveTitle(/Swag Labs/);
// });
// test.beforeEach(async ({ page }) => {
//     await page.goto(process.env.demoUrl);
// });

// test('login to saucedemo', async ({ page }) => {
//     // await page.getByRole('input', {name:'user-name'}).click();
//     // await page.goto(process.env.demoUrl);
//     await page.locator('#user-name').fill(process.env.demoUser);
//     await page.locator('#password').fill(process.env.demoPassword);
//     await page.locator('#login-button').click();
//     await expect(page).toHaveURL(/inventory.html/);

//     console.log('the user is: ' + process.env.demoUser);
//     console.log('the password is: ' + process.env.demoPassword);

// });
// ---------------------------x--------------------------x----------------------------------------
const { test, expect } = require('@playwright/test');
require('dotenv').config();
const { login } = require('../pages/login.js');
const { inventory } = require('../pages/inventory.js');

test.describe('Login Page Test Suite', () => {

    let loginPage;
    let inventoryPage;
    // inventoryPage = inventory(page);

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

    //test invalid login with incorrect email
    test('Try login with incorrect email', async () => {
        await loginPage.fullLoginWithInvalidEmail();
        console.log('Invalid Email validation handled successfully');
    });
    //get product list from the inventory page
    test('The products Lists are...', async ({ page }) => {
        inventoryPage = inventory(page);
        await loginPage.fullLogin();
        await inventoryPage.getProductList();
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await inventoryPage.addToCart('Sauce Labs Bike Light');
        await inventoryPage.addToCart('Sauce Labs Bolt T-Shirt');
        await inventoryPage.addToCart('Sauce Labs Fleece Jacket');
        await expect(page.locator('.shopping_cart_badge')).toBeVisible();
        console.log('Products added to the cart successfully');


    });

    test('the number of items in the cart is...', async ({ page }) => {
        inventoryPage = inventory(page);
        await loginPage.fullLogin();
        await inventoryPage.getCartItemsNum();
        console.log('the number of items in the cart is successfully retrieved');

    });

    //click on the add to cart button for a specific product

});
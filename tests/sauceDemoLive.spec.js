// ✔ Valid Login
// ✔ Invalid Login
// ✔ Add Product To Cart
// ✔ Cart Count Validation
// ✔ Verify Product is Added to the Cart
// ✔ Remove Product
// ✔ Checkout Flow
//

const { test, expect, page } = require('@playwright/test');
require('dotenv').config();
const { login } = require('../pages/login');
const { inventory } = require('../pages/inventory');

test.describe('', () => {
    //Valid Login
    let loginPage
    let inventoryPage
    test.beforeEach(async ({ page }) => {
        loginPage = login(page);
        inventoryPage = inventory(page);
    });
    //Valid Login
    test('Valid Login ', async ({ page }) => {
        await loginPage.fullLogin();
        console.log('Full login process successfully completed');
    });
    //Invalid Login
    test('Invalid login : email incorrect', async ({ page }) => {
        await loginPage.fullLoginWithInvalidEmail();
        console.log('Invalid Email validation handled successfully');
    });
    //add product to cart
    test('Add product to cart ....', async ({ page }) => {
        await loginPage.fullLogin();
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await inventoryPage.addToCart('Sauce Labs Bike Light');
        console.log('Products added to the cart successfully');
    });
    // get product count in the cart
    test('get product count in the cart ....', async ({ page }) => {
        await loginPage.fullLogin();
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await inventoryPage.addToCart('Sauce Labs Bike Light');
        await inventoryPage.addToCart('Sauce Labs Bolt T-Shirt');
        await inventoryPage.addToCart('Sauce Labs Fleece Jacket');
        //check the visibility of the cart badge
        // await expect(page.locator('.shopping_cart_link')).toBeVisible();
        // await expect(page.locator('.shopping_cart_badge')).toBeVisible();
        await inventoryPage.getCartItemsNum();
    }),
        //open the cart page
        test('click open the cart page ....', async ({ page }) => {
            await loginPage.fullLogin();
            await inventoryPage.addToCart('Sauce Labs Backpack');
            await inventoryPage.addToCart('Sauce Labs Bike Light');
            await inventoryPage.openCartPage();
        });
});
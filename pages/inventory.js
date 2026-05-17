// 1. 🛒 inventory.page.js (MOST IMPORTANT NEXT)

// This is your main dashboard after login.
// Responsibilities:

// Get product list
// Add item to cart
// Remove item
// Sort products
// Go to cart
const { expect, page } = require('@playwright/test');
const { login } = require('../pages/login');
require('dotenv').config();

function inventory(page) {
    //get product list
    // await login(page).fullLogin();
    // let productName = 'Sauce Labs Backpack';

    return {
        //get product list...
        async getProductList() {
            console.log('Successfully logged in to the inventory page');
            const getProductList = await page.locator('.inventory_item_name ').allTextContents();
            console.log('the product list is: ' + getProductList);
            console.log(typeof (getProductList));
            console.log(getProductList.length);
            let productArr = [...getProductList.values()];
            console.log(productArr);


        },
        //Add item to cart...
        async addToCart(productName) {
            //search for the product
            const productLocated = await page.locator('.inventory_item').filter({ hasText: productName });
            await expect(productLocated).toBeVisible();
            //click on the add to cart button
            await productLocated.getByText('Add to cart').click();
            console.log('the product added to the cart is: ' + productName);
        },

        //getText of the cart items or badges
        async getCartItemsNum() {
            const cartCount = await page.locator('.shopping_cart_badge').textContent();
            console.log('the number of items in the cart is: ' + cartCount);
            return cartCount;
        },
        //click open the cart page
        async openCartPage() {
            //div[@class='cart_item']//div[2]//a//div
            await page.locator('.shopping_cart_link').click();
            const getCartProductList = await page.locator('.inventory_item_name').allTextContents();
            console.log('the products in the cart are: ' + getCartProductList);
            console.log('Successfully navigated to the cart page');
            console.log('the type of the variable is  : ' + typeof (getCartProductList));
        },

        // remove the item from the cart...
        async removeFromCart(productName) {
            let cartIcon = await page.locator('.shopping_cart_link')
            await cartIcon.click();
            console.log('Successfully navigated to the cart page');
        },

        //verify the product is added to the cart....

    };
}

// inventory()

module.exports = { inventory };
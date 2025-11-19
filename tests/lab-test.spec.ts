import { test, expect, Locator } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page'
import { ProductPage} from '../page-objects/products-page'
import { CartPage} from '../page-objects/cart-page'
import {SidebarPage} from '../page-objects/sidebar-page'
import productData from '../test-data/products.json'
import {faker} from '@faker-js/faker'

let loginPage: LoginPage
let productPage: ProductPage
let cartPage: CartPage
let sidebarPage: SidebarPage

test.describe('Swag Labs Tests',async () => {
test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    productPage = new ProductPage(page)
    cartPage = new CartPage(page)
    sidebarPage = new SidebarPage(page)
    await page.goto('/')
});

test('TC01: Login Success for Standard User',{ tag: ['@login', '@regression'] }, async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(productPage.productTitle).toContainText('Products');
});

test('TC02: Login Failure for Incorrect Credentials',{ tag: ['@login', '@regression'] }, async ({ page }) => {
    await loginPage.login('test', 'secret')
    await expect(loginPage.incorrectCredentialsMessage).toContainText('Username and password do not match any user in this service');
});

test('TC03: Add Product to Cart', async ({ page }) => {
    const productName = productData[0].name
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(productPage.productTitle).toContainText('Products');
    const emptyCart = await productPage.getShoppingCartBadgeNumber()
    await productPage.addToCartButton(productName).click()
    await expect(productPage.removeButtonByText(productName)).toBeVisible()
    const cartBadgeNumber = await productPage.getShoppingCartBadgeNumber()
    await expect(cartBadgeNumber).toBe(emptyCart + 1)
});

test('TC04: Add Multiple products to Cart', async ({ page }) => {
    const products = productData
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(productPage.productTitle).toContainText('Products');
    await productPage.addProductsToCart(products)
});

test('TC05: Remove Product from Cart', async ({ page }) => {
    const productName = productData[1].name
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(productPage.productTitle).toContainText('Products');
    const emptyCart = await productPage.getShoppingCartBadgeNumber()
    await productPage.addToCartButton(productName).click()
    await expect(productPage.removeButtonByText(productName)).toBeVisible()
    await productPage.removeButtonByText(productName).click()
    const cartBadgeNumber = await productPage.getShoppingCartBadgeNumber()
    await expect(productPage.addToCartButton(productName)).toBeVisible()
    await expect(cartBadgeNumber).toBe(emptyCart)
});

test('TC06: Checkout Product', async ({ page }) => {
    const products = productData
    await page.goto('/')
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(productPage.productTitle).toContainText('Products');
    await productPage.addProductsToCart(products)
    await productPage.shoppingCartIcon.click()
    await expect(cartPage.yourCartTitle).toBeVisible()
    await cartPage.validateProductItemsAreDisplayed(products)
    await cartPage.checkoutButton.click()
    await cartPage.fillCheckoutInformation(faker.person.firstName(), faker.person.lastName(), faker.location.zipCode())
    await cartPage.continueButton.click()
    await cartPage.finishButton.click()
    await cartPage.validateCheckoutWasSuccessfully()
});

test('TC07: Logout Success', async ({ page }) => {
    await page.goto('/')
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(productPage.productTitle).toContainText('Products');
    await sidebarPage.sidebarButton.click()
    await sidebarPage.logoutButton.click()
    await expect(loginPage.loginButton).toBeVisible()
});

test('TC08: Sort by Name (A to Z)', async ({ page }) => {
    await page.goto('/')
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(productPage.productTitle).toContainText('Products');
    await productPage.sortProductSelect.selectOption('az')
    await productPage.validateSortedProducts('az');
})

test('TC09: Sort by Name (Z to A)', async ({ page }) => {
    await page.goto('/')
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(productPage.productTitle).toContainText('Products');
    await productPage.sortProductSelect.selectOption('za')
    await productPage.validateSortedProducts('za');
})

test('TC10: Sort by Price (low to high)', async ({ page }) => {
    await page.goto('/')
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(productPage.productTitle).toContainText('Products');
    await productPage.sortProductSelect.selectOption('lohi')
    await productPage.validateSortedProducts('lohi')
});

test('TC11: Sort by Price (high to low)', async ({ page }) => {
    await page.goto('/')
    await loginPage.login('standard_user', 'secret_sauce')
    await expect(productPage.productTitle).toContainText('Products');
    await productPage.sortProductSelect.selectOption('hilo')
    await productPage.validateSortedProducts('hilo')
});

})

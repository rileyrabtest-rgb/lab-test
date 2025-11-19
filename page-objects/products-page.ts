import { test, expect, Page, Locator } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly productTitle: Locator
    readonly productsContainer: Locator;
    readonly productItemByText: (productName: string) => Locator;
    readonly addToCartButton: (productName: any) => Locator;
    readonly removeButtonByText: (productName: any) => Locator;
    readonly productItemByIndex: (index: any) => Locator;
    readonly firstAddToCartButton: (index: any) => any;
    readonly shoppingCartBadge: Locator;
    readonly shoppingCartIcon: Locator;
    readonly sortProductSelect: Locator;
    readonly allProductNames: Locator;
    readonly allProductPrices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTitle = page.locator('[data-test="title"]')
        this.productsContainer = page.locator('[data-test="inventory-container"]')
        this.productItemByText = (productName) => this.page.locator('[data-test="inventory-list"] div').filter({ hasText: productName }).first()
        this.addToCartButton = (productName) => this.productItemByText(productName).getByRole('button', { name: 'Add to Cart' })
        this.removeButtonByText = (productName) => this.productItemByText(productName).getByRole('button', { name: 'Remove' })
        this.productItemByIndex = (index) => this.page.locator('[data-test="inventory-list"] div').nth(index)
        this.firstAddToCartButton = (index) => this.productItemByIndex(index).getByRole('button', { name: 'Add to Cart' })
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]')
        this.shoppingCartIcon = page.locator('[data-test="shopping-cart-link"]')
        this.sortProductSelect = page.locator('[data-test="product-sort-container"]');
        this.allProductNames = page.locator('[data-test="inventory-item-name"]')
        this.allProductPrices = page.locator('//*[@data-test="inventory-item-price"]')

    }

    async getShoppingCartBadgeNumber() {
        let itemCount;
        if (await this.shoppingCartBadge.isVisible()) {
            const shoppingCartBadgeText = await this.shoppingCartBadge.textContent();
            if (shoppingCartBadgeText !==null){
            itemCount = parseInt(shoppingCartBadgeText);
            }
            if (isNaN(itemCount)) {
                console.error('The text obtained is not a number');
                return 0;
            }

            return itemCount;
        } else {
            console.log("There is no item visible on the Shopping Cart Badge");
            return 0;
        }
    }

    async addProductsToCart(products:any){
        const emptyCart = await this.getShoppingCartBadgeNumber()
        for (const product of products) {
            await this.addToCartButton(product.name).click()
            await expect(this.removeButtonByText(product.name)).toBeVisible()
        }
        const cartBadgeNumber = await this.getShoppingCartBadgeNumber()
        await expect(cartBadgeNumber).toBe(emptyCart + products.length)
    }

    async validateSortedProducts(value) {
        switch (value) {
            case 'az': {
                let productNamesText = await this.allProductNames.allTextContents()
                const productsTextClone = [...productNamesText].sort((a, b) => a.localeCompare(b))
                console.log(productNamesText)
                console.log(productsTextClone)
                await expect(productNamesText).toEqual(productsTextClone)
                break;
            }
            case 'za': {
                let productNamesText = await this.allProductNames.allTextContents()
                const productsTextClone = [...productNamesText].sort((a, b) => b.localeCompare(a))
                console.log(productNamesText)
                console.log(productsTextClone)
                await expect(productNamesText).toEqual(productsTextClone)
                break;
            }
            case 'lohi': {
                let productPricesText = await this.allProductPrices.allTextContents()
                const productsTextClone = [...productPricesText].sort((a, b) => {
                    // Extract number from each string
                    let valorA = parseFloat(a.slice(1));
                    let valorB = parseFloat(b.slice(1));
                    // Compare Numeric Values
                    return valorA - valorB;
                  });
                console.log(productPricesText)
                console.log(productsTextClone)
                await expect(productPricesText).toEqual(productsTextClone)
                break;
            }
            case 'hilo': {
                let productPricesText = await this.allProductPrices.allTextContents()
                const productsTextClone = [...productPricesText].sort((a, b) => {
                    let valorA = parseFloat(a.slice(1));
                    let valorB = parseFloat(b.slice(1));
                    return valorB - valorA;
                  });
                console.log(productPricesText)
                console.log(productsTextClone)
                await expect(productPricesText).toEqual(productsTextClone)
                break;
            }
            default:
                break;
        }
    }
}

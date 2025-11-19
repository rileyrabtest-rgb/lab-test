import { Page } from "@playwright/test";


export class SidebarPage {
    readonly page: Page
    readonly sidebarButton: any;
    readonly allItemsButton: any;
    readonly aboutButton: any;
    readonly logoutButton: any;
    readonly resetAppButton: any;

    constructor(page:Page) {
        this.page = page;
        this.sidebarButton =  page.locator('[id="react-burger-menu-btn"]')
        this.allItemsButton = page.locator('//a[text()="All Items"]')
        this.aboutButton = page.locator('//a[text()="About"]')
        this.logoutButton = page.locator('//a[text()="Logout"]')
        this.resetAppButton = page.locator('//a[text()="Reset App State"]')
    }


}

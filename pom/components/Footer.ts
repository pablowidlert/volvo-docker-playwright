import { Locator, Page } from '@playwright/test'

export class Footer {
    private readonly page: Page

    // Locators
    readonly linkCount: Locator
    readonly cookieBtn: Locator
    readonly legalBtn: Locator
    readonly privacyBtn: Locator
    readonly socialBtn: Locator
    readonly tellUsBtn: Locator
    readonly copyrightBanner: Locator

    constructor(page: Page) {
        this.page = page
        this.linkCount = page.getByTestId('footer:links')
        this.cookieBtn = this.linkCount.nth(0)
        this.legalBtn = this.linkCount.nth(1)
        this.privacyBtn = this.linkCount.nth(2)
        this.socialBtn = this.linkCount.nth(3)
        this.tellUsBtn = this.linkCount.nth(4)
        this.copyrightBanner = page.getByTestId('footer:copyright')
    }
}


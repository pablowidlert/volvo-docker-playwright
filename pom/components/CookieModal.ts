import { Locator, Page } from '@playwright/test'

export class CookieModal {
    private readonly page: Page

    // Locators
    readonly cookieBanner: Locator
    readonly acceptBtn: Locator
    readonly settingsBtn: Locator
    readonly rejectBtn: Locator

    // Consent Preferences Locators
    readonly necessaryCookies: Locator
    readonly performanceCookies: Locator
    readonly functionalCookies: Locator
    readonly advertisingCookies: Locator
    readonly statisticsCookies: Locator
    readonly rejectAllBtn: Locator
    readonly confirmChoicesBtn: Locator
    readonly allowAllBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.cookieBanner = page.locator('div #onetrust-policy-text')
        this.acceptBtn = page.locator('#onetrust-accept-btn-handler')
        this.settingsBtn = page.locator('#onetrust-pc-btn-handler')
        this.rejectBtn = page.locator('#onetrust-reject-all-handler')
        this.necessaryCookies = page.locator('#ot-group-id-1')
        this.performanceCookies = page.locator('#ot-group-id-2 + label .ot-switch-nob')
        this.functionalCookies = page.locator('#ot-group-id-3 + label .ot-switch-nob')
        this.advertisingCookies = page.locator('#ot-group-id-4 + label .ot-switch-nob')
        this.statisticsCookies = page.locator('#ot-group-id-9 + label .ot-switch-nob')
        this.rejectAllBtn = page.locator('button.ot-pc-refuse-all-handler')
        this.confirmChoicesBtn = page.locator('button.save-preference-btn-handler')
        this.allowAllBtn = page.locator('#accept-recommended-btn-handler')
    }

    async acceptAllCookies() {
        await this.acceptBtn.click()
    }

    async cookieSettings() {
        await this.settingsBtn.click()
    }

    async rejectAllCookies() {
        await this.rejectBtn.click()
    }

    async necessaryCookieToggle() {
        await this.necessaryCookies.click()
    }

    async performanceCookieToggle() {
        await this.performanceCookies.click()
    }

    async functionalCookieToggle() {
        await this.functionalCookies.click()
    }

    async advertisingCookieToggle() {
        await this.advertisingCookies.click()
    }

    async statisticsCookieToggle() {
        await this.statisticsCookies.click()
    }

    async rejectConsentPreferences() {
        await this.rejectAllBtn.click()
    }

    async confirmChoicesConsentPreferences() {
        await this.confirmChoicesBtn.click()
    }

    async allowAllConsentPreferences() {
        await this.allowAllBtn.click()
    }

    async selectAllConsentPreferences() {
        await this.performanceCookieToggle()
        await this.functionalCookieToggle()
        await this.advertisingCookieToggle()
        await this.statisticsCookieToggle()
    }
}


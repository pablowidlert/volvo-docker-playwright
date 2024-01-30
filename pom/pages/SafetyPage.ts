import { Locator, Page } from '@playwright/test'

export class SafetyPage {
    readonly page: Page
    readonly isMobile: boolean
    readonly isDropdownMenuDisplayed: boolean
    // Dropdown and submenu locators
    private readonly dropdownMenu: Locator
    private readonly highlightslocator: Locator
    private readonly cultureLocator: Locator
    private readonly featuresLocator: Locator
    private readonly childSafetyLocator: Locator
    private readonly researchLocator: Locator
    private readonly heritageLocator: Locator

    constructor(page: Page, isMobile: boolean) {
        this.page = page
        this.isMobile = isMobile ?? false
        // Is the current viewport displaying dropdown menus
        this.isDropdownMenuDisplayed = page.viewportSize()?.width < 1024

        // These are autoids the last section is language dependent so will break when any language except english is selected
        this.dropdownMenu = page.getByTestId('localSubMenu:dropDown')
        this.highlightslocator = page.getByTestId('localSubMenu:links:highlights')
        this.cultureLocator = page.getByTestId('localSubMenu:links:culture&vision')
        this.featuresLocator = page.getByTestId('localSubMenu:links:features')
        this.childSafetyLocator = page.getByTestId('localSubMenu:links:childsafety')
        this.researchLocator = page.getByTestId('localSubMenu:links:research')
        this.heritageLocator = page.getByTestId('localSubMenu:links:heritage')
    }

    async navigate() {
        await this.page.goto('', { waitUntil: 'domcontentloaded' })
    }

    async clickHighlights() {
        await this.selectSubmenuLocator(this.highlightslocator)
    }
    async clickCulture() {
        await this.selectSubmenuLocator(this.cultureLocator)
    }
    async clickFeatures() {
        await this.selectSubmenuLocator(this.featuresLocator)
    }
    async clickChildSafety() {
        await this.selectSubmenuLocator(this.childSafetyLocator)
    }
    async clickResearch() {
        await this.selectSubmenuLocator(this.researchLocator)
    }
    async clickHeritage() {
        await this.selectSubmenuLocator(this.heritageLocator)
    }

    /**
     * Helper to handle synchronization after clicking sub menu topics
     * @param locatorToSelect
     */
    private async selectSubmenuLocator(locatorToSelect: Locator) {
        if (this.isDropdownMenuDisplayed) {
            await this.dropdownMenu.click()
        }
        await locatorToSelect.click()
        await this.page.waitForURL('**/safety/*', { waitUntil: 'domcontentloaded' })
    }
}


import { Locator, Page } from '@playwright/test'

export enum NavbarCategories {
    OUR_CARS = 'Our Cars',
    SHOP = 'Shop',
    OWNERS = 'Owners',
    ABOUT_US = 'About us',
}

export type ariaAttributesSupported = 'button' | 'tab'

export class Navbar {
    private readonly page: Page
    private readonly isDropdownMenuDisplayed: boolean

    // Locators
    readonly header: Locator
    readonly ourCars: Locator
    readonly closeNavbarBtn: Locator

    readonly electricCategory: Locator
    readonly hybridCategory: Locator
    readonly mildHybridCategory: Locator
    readonly shopBtn: Locator
    readonly ownersBtn: Locator
    readonly aboutUs: Locator

    // Desktop only
    readonly carMenuDesktop: Locator

    readonly sideNav: Locator
    readonly roleAria: ariaAttributesSupported

    // Mobile only locators
    readonly menuBtn: Locator

    constructor(page: Page) {
        this.page = page
        // Is the current viewport displaying dropdown menus
        this.isDropdownMenuDisplayed = page.viewportSize()?.width < 1024

        this.header = page.locator('[id="sitenav:topbar"]')
        this.ourCars = page.locator('[data-autoid="nav:topNavCarMenu"]')
        this.closeNavbarBtn = this.isDropdownMenuDisplayed
            ? page.getByTestId('nav:siteNavCloseIcon')
            : page.getByTestId('nav:carMenuCloseIcon')

        // Handle desktop/mobile role locators
        this.roleAria = this.isDropdownMenuDisplayed ? 'button' : 'tab'
        this.electricCategory = page.getByRole(`${this.roleAria}`, { name: 'Electric' })
        this.hybridCategory = page.getByRole(`${this.roleAria}`, { name: 'Hybrids Plug-in' })
        this.mildHybridCategory = page.getByRole(`${this.roleAria}`, { name: 'Mild hybrids' })

        this.shopBtn = page.getByRole('button', { name: 'Shop' })
        this.ownersBtn = page.getByRole('button', { name: 'Owners' })
        this.aboutUs = page.getByRole('button', { name: 'About' })

        this.carMenuDesktop = page.locator('#nav:carMenuDesktop')

        this.sideNav = page.locator('[id="nav:sideNavigation"]')
        // Mobile
        this.menuBtn = page.locator('#sitenav-sidenav-toggle')
    }

    async browseCars() {
        await this.browseTo(NavbarCategories.OUR_CARS)
    }

    async browseShop() {
        await this.browseTo(NavbarCategories.SHOP)
    }

    async browseOwners() {
        await this.browseTo(NavbarCategories.OWNERS)
    }

    async browseAboutUs() {
        await this.browseTo(NavbarCategories.ABOUT_US)
    }

    /**
     * Helps synchronize the navbar after clicking to
     */
    async closeNavbar() {
        await this.closeNavbarBtn.click()
        await this.sideNav.waitFor({ state: 'hidden' })
    }

    private async browseTo(category: NavbarCategories) {
        if (this.isDropdownMenuDisplayed) {
            if (await this.sideNav.isHidden()) {
                await this.menuBtn.click()
            }
        }
        switch (category) {
            case NavbarCategories.OUR_CARS:
                if (!this.isDropdownMenuDisplayed) {
                    await this.ourCars.click()
                }
                break
            case NavbarCategories.SHOP:
                await this.shopBtn.click()
                break
            case NavbarCategories.OWNERS:
                await this.ownersBtn.click()
                break
            case NavbarCategories.ABOUT_US:
                await this.aboutUs.click()
                break
            default:
                console.log('Unable to find matching category')
                break
        }
    }
}


import { SafetyPage } from '@pages/SafetyPage'
import { test as baseTest } from '@playwright/test'
import { CookieModal } from '@components/CookieModal'
import { Navbar } from '@components/Navbar'
import { Footer } from '@components/Footer'

export const test = baseTest.extend<{
    cookieModal: CookieModal
    footer: Footer
    navbar: Navbar
    safetyPage: SafetyPage
}>({
    cookieModal: async ({ page }, use) => {
        await use(new CookieModal(page))
    },
    footer: async ({ page }, use) => {
        await use(new Footer(page))
    },
    navbar: async ({ page }, use) => {
        await use(new Navbar(page))
    },
    safetyPage: async ({ page, isMobile }, use) => {
        await use(new SafetyPage(page, isMobile))
    },
})


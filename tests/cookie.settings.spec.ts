import { expect } from '@playwright/test'
import { test } from '@fixtures/BaseTest'
import { CookieModal } from '@components/CookieModal'

test.describe.configure({ mode: 'parallel' })

test.describe('Cookie Settings', () => {
    test.beforeEach(async ({ safetyPage }) => {
        await safetyPage.navigate()
    })

    test('Displays All Buttons On Modal Start View', async ({ cookieModal }) => {
        await displaysAllButtons(cookieModal)
    })

    test('Displays All Buttons And Toggles In Consent Preferences', async ({ cookieModal }) => {
        await cookieModal.settingsBtn.click()
        await displaysAllButtonsAndTogglesInConsentPreferences(cookieModal)
    })

    test('Hides Allow All Button When All Preferences Are Selected In Consent Preferences', async ({ cookieModal }) => {
        await cookieModal.settingsBtn.click()
        await cookieModal.selectAllConsentPreferences()
        await expect(cookieModal.allowAllBtn).not.toBeVisible()
    })

    test('Accepts Cookies And Persists User Response On Reload', async ({ cookieModal, safetyPage }) => {
        await cookieModal.acceptBtn.click()
        await safetyPage.navigate()
        await expect(cookieModal.cookieBanner).not.toBeVisible()
    })
})

async function displaysAllButtons(cookieModal: CookieModal) {
    await expect(cookieModal.cookieBanner).toBeVisible()
    await expect(cookieModal.settingsBtn).toBeVisible()
    await expect(cookieModal.rejectBtn).toBeVisible()
    await expect(cookieModal.acceptBtn).toBeVisible()
}

async function displaysAllButtonsAndTogglesInConsentPreferences(cookieModal: CookieModal) {
    await expect(cookieModal.performanceCookies).toBeVisible()
    await expect(cookieModal.functionalCookies).toBeVisible()
    await expect(cookieModal.advertisingCookies).toBeVisible()
    await expect(cookieModal.statisticsCookies).toBeVisible()
    await expect(cookieModal.rejectAllBtn).toBeVisible()
    await expect(cookieModal.confirmChoicesBtn).toBeVisible()
    await expect(cookieModal.allowAllBtn).toBeVisible()
}


import { test } from '@fixtures/BaseTest'
import { expect } from '@playwright/test'

test.describe.configure({ mode: 'parallel' })

test.describe('Footer Navigation', () => {
    test.beforeEach(async ({ cookieModal, safetyPage }) => {
        await safetyPage.navigate()
        await cookieModal.acceptBtn.click()
    })

    test('Displays All Links In The Footer', async ({ footer }) => {
        await expect(footer.linkCount).toHaveCount(5)
        await expect(footer.cookieBtn).toBeVisible()
        await expect(footer.legalBtn).toBeVisible()
        await expect(footer.privacyBtn).toBeVisible()
        await expect(footer.socialBtn).toBeVisible()
        await expect(footer.tellUsBtn).toBeVisible()
        await expect(footer.copyrightBanner).toBeVisible()
    })
})


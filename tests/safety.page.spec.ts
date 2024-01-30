import { expect } from '@playwright/test'
import { test } from '@fixtures/BaseTest'

test.describe.configure({ mode: 'parallel' })

test.describe('Safety Page', () => {
    test.beforeEach(async ({ cookieModal, safetyPage }) => {
        await safetyPage.navigate()
        await cookieModal.acceptBtn.click()
    })

    test('Navigates Through Safety Information Via Menubar', async ({ safetyPage }) => {
        await safetyPage.clickChildSafety()
        expect(await safetyPage.page.title()).toBe('Safety - Child Safety | Volvo Cars')
        await safetyPage.clickCulture()
        expect(await safetyPage.page.title()).toBe('Safety - Culture & Vision | Volvo Cars')
        await safetyPage.clickFeatures()
        expect(await safetyPage.page.title()).toBe('Safety - Features | Volvo Cars')
        await safetyPage.clickHeritage()
        expect(await safetyPage.page.title()).toBe('Safety - Heritage | Volvo Cars')
        await safetyPage.clickHighlights()
        expect(await safetyPage.page.title()).toBe('Safety - Highlights | Volvo Cars')
        await safetyPage.clickResearch()
        expect(await safetyPage.page.title()).toBe('Safety - Research | Volvo Cars')
    })
})


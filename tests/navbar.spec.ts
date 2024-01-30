import { test } from '@fixtures/BaseTest'

test.describe.configure({ mode: 'parallel' })

test.describe('Navbar Navigation', () => {
    test.beforeEach(async ({ cookieModal, safetyPage }) => {
        await safetyPage.navigate()
        await cookieModal.acceptBtn.click()
    })

    test('Displays All Navbar Categories', async ({ navbar }) => {
        await navbar.browseCars()
        await navbar.electricCategory.click()
        await navbar.hybridCategory.click()
        await navbar.mildHybridCategory.click()
        await navbar.closeNavbar()
        await navbar.browseShop()
        await navbar.browseOwners()
        await navbar.browseAboutUs()
    })
})


import { test, expect } from '@playwright/test';

test.describe('AUTH - Authentication', () => {
    const BASE_URL = "https://pw-practice-dev.playwrightvn.com/wp-admin";
    const ADMIN_USERNAME = 'betterbytes.academy.admin';
    const ADMIN_PASSWORD = 'StrongPass@BetterBytesAcademy';

    // Đi tới trang login
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
    });

    test('@AUTH_001: Login fail', async ({ page }) => {
        const wrongUsername = 'betterbytes.admin'
        await test.step('Nhập vào thông tin username, password bị sai', async () => {
            await page.locator("//input[@id='user_login']").fill(wrongUsername);
            await page.locator("//input[@id='user_pass']").fill(ADMIN_PASSWORD);
        });

        await test.step('Click button login', async () => {
            await page.locator("//input[@id='wp-submit']").click();
        });

        // Hiển thị lỗi
        await expect(page.getByText(`Error: The username ${wrongUsername} is not registered on this site. If you are unsure of your username, try your email address instead.`)).toBeVisible();

    });

    // test('@AUTH_001: Login fail with wrong password', async ({ page }) => {
    //     const wrongPass = 'Pass@BetterBytesAcademy';
    //     await test.step('Nhập vào thông tin username, password bị sai', async () => {
    //         await page.locator("//input[@id='user_login']").fill(ADMIN_USERNAME);
    //         await page.locator("//input[@id='user_pass']").fill(wrongPass);
    //     });

    //     await test.step('Click button login', async () => {
    //         await page.locator("//input[@id='wp-submit']").click();
    //     });

    //     // Hiển thị lỗi
    //     await expect(await page.getByText(`Error: The password you entered for the username ${ADMIN_USERNAME} is incorrect.`)).toBeVisible();

    // });

    test('@AUTH_002: Login success', async ({ page }) => {
        await test.step('Nhập vào thông tin username và password đúng', async () => {
            await page.locator("//input[@id='user_login']").fill(ADMIN_USERNAME);
            await page.locator("//input[@id='user_pass']").fill(ADMIN_PASSWORD);
        });

        await test.step('Click button login', async () => {
            await page.locator("//input[@id='wp-submit']").click();
        });

        // Login thành công. Chuyển tới trang có url /wp-admin
        await expect(page).toHaveURL(/wp-admin/);

        // Có heading h1 "Dashboard"
        await expect(page.locator("//h1[text()='Dashboard']")).toBeVisible();

        // Có 2 heading h2 "At a Glance" và "Activity"
        await expect(page.locator("//h2[text()='At a Glance']")).toBeVisible();
        await expect(page.locator("//h2[text()='Activity']")).toBeVisible();
    });
});
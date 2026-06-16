import { test, expect } from '@playwright/test';

test.describe('AUTH - Authentication', () => {

    // Đi tới trang login
    test.beforeEach(async ({ page }) => {
        {
            await page.goto('https://pw-practice-dev.playwrightvn.com/wp-admin');
        }
    });

    test('@AUTH_001: Login fail', async ({ page }) => {
        const wrongUsername = 'betterbytes.admin'
        const password = 'StrongPass@BetterBytesAcademy';
        await test.step('Nhập vào thông tin username, password bị sai', async () => {
            await page.locator("//input[@id='user_login']").fill(wrongUsername);
            await page.locator("//input[@id='user_pass']").fill(password);
        });

        await test.step('Click button login', async () => {
            await page.locator("//input[@id='wp-submit']").click();
        });

        // Hiển thị lỗi
        await expect(page.getByText(`Error: The username ${wrongUsername} is not registered on this site. If you are unsure of your username, try your email address instead.`)).toBeVisible();

    });

    // test('@AUTH_001: Login fail with wrong password', async ({ page }) => {
    //     const username = 'betterbytes.academy.admin'
    //     const wrongPass = 'Pass@BetterBytesAcademy';
    //     await test.step('Nhập vào thông tin username, password bị sai', async () => {
    //         await page.locator("//input[@id='user_login']").fill(username);
    //         await page.locator("//input[@id='user_pass']").fill(wrongPass);
    //     });

    //     await test.step('Click button login', async () => {
    //         await page.locator("//input[@id='wp-submit']").click();
    //     });

    //     // Hiển thị lỗi
    //     await expect(await page.getByText(`Error: The password you entered for the username ${username} is incorrect.`)).toBeVisible();

    // });

    test('@AUTH_002: Login success', async ({ page }) => {
        const username = 'betterbytes.academy.admin'
        const password = 'StrongPass@BetterBytesAcademy';
        await test.step('Nhập vào thông tin username, password bị sai', async () => {
            await page.locator("//input[@id='user_login']").fill(username);
            await page.locator("//input[@id='user_pass']").fill(password);
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
import { test, expect } from '@playwright/test';

test('Đăng ký', async ({ page }) => {

    await test.step('Đi tới trang chủ material', async () => {
        await page.goto("https://material.playwrightvn.com/");
    });

    await test.step('Click vào Bài học 1: Register Page', async () => {
        await page.locator("//a[@href='01-xpath-register-page.html']").click();
    });

    await test.step('Nhập thông tin đăng ký', async () => {
        //Username
        await page.locator("//input[@id='username']").fill("ydang");

        //Email
        await page.locator("//input[@id='email']").fill("test@gmail.com");

        //Gender: female
        await page.locator("//input[@id='female']").check();

        //Hobbies: reading, traveling
        await page.locator("//input[@id='reading']").check();
        await page.locator("//input[@id='traveling']").check();

        // Interests: Technology, Music
        await page.locator("//select[@id='interests']").selectOption(['technology', 'music']);

        // Country
        await page.locator("//select[@id='country']").selectOption('canada');

        // Date of Birth
        await page.locator("//input[@id='dob']").fill('2003-06-11');

        // Profile Picture (Upload File)
        const filePath = 'tests/lesson-05/avatar.jpg';
        await page.locator("//input[@id='profile']").setInputFiles(filePath);

        // Biography
        await page.locator("//input[@id='bio']").fill('Đây là một đoạn text dùng để test.');
    });

    await test.step('b. Click button Register', async () => {
        await page.locator("//button[text()='Register']").click();
    });

});
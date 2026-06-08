import { test, expect } from '@playwright/test';

test('Test 2: Product Page', async ({ page }) => {

    await test.step('Đi tới trang chủ material', async () => {
        await page.goto("https://material.playwrightvn.com/");
    });

    await test.step('Click vào Bài học 2: Product Page', async () => {
        await page.locator("//a[@href='02-xpath-product-page.html']").click();
    });

    await test.step('a. Sản phẩm 1: 2 sản phẩm', async () => {
        await page.locator("//button[@data-product-id='1']").click({clickCount: 2});
    });
    
    await test.step('b. Sản phẩm 2: 3 sản phẩm', async () => {
        await page.locator("//button[@data-product-id='2']").click({clickCount: 3});
    });

    await test.step('c. Sản phẩm 3: 1 sản phẩm', async () => {
        await page.locator("//button[@data-product-id='3']").click();
    });
});
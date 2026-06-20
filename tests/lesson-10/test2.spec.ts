import { test, expect } from '@playwright/test';
import { ProductPage } from './01-pom';

test('Test 2: Product Page', async ({ page }) => {
    let productPage: ProductPage;
    productPage = new ProductPage(page);

    await test.step('Click vào Bài học 2: Product Page', async () => {
        productPage.goto()
    });

    await test.step('a1. Sản phẩm 1: 2 sản phẩm', async () => {
        await productPage.addProductToCart(1, 2);
    });

    await test.step('a2. Sản phẩm 2: 3 sản phẩm', async () => {
        await productPage.addProductToCart(2, 3);
    });

    await test.step('a3. Sản phẩm 3: 1 sản phẩm', async () => {
        await productPage.addProductToCart(3);
    });

    await test.step('b. Kiểm tra số lương sản phẩm tại giỏ hàng', async () => {
        await expect(productPage.getCartProductQuantity('Product 1')).toHaveText('2');
        await expect(productPage.getCartProductQuantity('Product 2')).toHaveText('3');
        await expect(productPage.getCartProductQuantity('Product 3')).toHaveText('1');
    })

    await test.step('c. Kiểm tra tổng tiền tại giỏ hàng', async () => {
        await expect(productPage.totalPriceLabel).toHaveText('$110.00')
    })
});
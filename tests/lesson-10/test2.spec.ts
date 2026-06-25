import { test, expect } from '@playwright/test';
import { ProductPage } from './01-pom';

test('Test 2: Product Page', async ({ page }) => {
    const productPage = new ProductPage(page);

    await test.step('Đi tới trang chủ và click vào Bài học 2: Product Page', async () => {
        await productPage.goto()
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
        const totalProduct1 = await productPage.parsePrice(productPage.getCartProductTotal('Product 1'));
        const totalProduct2 = await productPage.parsePrice(productPage.getCartProductTotal('Product 2'));
        const totalProduct3 = await productPage.parsePrice(productPage.getCartProductTotal('Product 3'));
        const totalPrice = totalProduct1 + totalProduct2 + totalProduct3;
        await expect(productPage.totalPriceLabel).toHaveText(`$${totalPrice.toFixed(2)}`);
    })
});
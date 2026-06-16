import { test, expect } from '@playwright/test';

test.describe('ACCOUNT - Account', () => {
    // Khai báo user data
    const username = 'k23_ydang';
    const email = 'dangvannhuy1106@gmail.com';
    const password = 'StrongPass@BetterBytesAcademy';
    const firstName = 'k23';
    const lastName = 'ydang';

    // Đi tới trang login
    test.beforeEach(async ({ page }) => {
        {
            // Login vào trang admin với account admin
            await page.goto('https://pw-practice-dev.playwrightvn.com/wp-admin');
            await page.locator("//input[@id='user_login']").fill('betterbytes.academy.admin');
            await page.locator("//input[@id='user_pass']").fill('StrongPass@BetterBytesAcademy');
            await page.locator("//input[@id='wp-submit']").click();
        }
    });

    // Teardown: Đăng nhập vào account admin và xoá account mới được tạo ra
    test.afterEach(async ({ page }) => {
        {
            // Logout user đang login hiện tại
            await page.locator("//li[@class='menupop with-avatar']").hover();
            await page.locator("//li[@id='wp-admin-bar-logout']").click();

            // Login vào trang admin với account admin
            await page.locator("//input[@id='user_login']").fill('betterbytes.academy.admin');
            await page.locator("//input[@id='user_pass']").fill('StrongPass@BetterBytesAcademy');
            await page.locator("//input[@id='wp-submit']").click();

            // Tìm kiếm user mới tạo và xóa user đó
            await page.locator("//div[text()='Users']").click();
            await page.locator("//input[@id='user-search-input']").fill(username);
            await page.locator("//input[@id='search-submit']").click();
            await page.locator("td[data-colname='Username']").hover();
            await page.locator("//a[text()='Delete']").click();
            const flakyElement = page.locator("//input[@id='delete_option0']");
            if (await flakyElement.isVisible()) {
                flakyElement.check();
            }
            await page.locator("//input[@id='submit']").click();
        }
    });

    test('@ACC_001: Create account with editor permission', async ({ page }) => {
        await test.step('Đi tới màn hình quản lý user', async () => {
            // Đi tới trang quản lý user
            await page.locator("//div[text()='Users']").click();

            // Heading "Users" visible
            await expect(page.locator("//h1[contains(text(), 'Users')]")).toBeVisible(); //await expect(page.locator('h1', { hasText: 'Users' })).toBeVisible();
            // Button "Add User" được enable
            await expect(page.locator("//a[@class='page-title-action']")).toBeEnabled();
        });

        await test.step('Thực hiện thêm mới user', async () => {
            //Click button Add User
            await page.locator("//a[@class='page-title-action']").click();

            // Nhập Username
            await page.locator("//input[@id='user_login']").fill(username);
            // Nhập Email
            await page.locator("//input[@id='email']").fill(email);
            // Nhập First Name
            await page.locator("//input[@id='first_name']").fill(firstName);
            // Nhập Last Name
            await page.locator("//input[@id='last_name']").fill(lastName);
            // Nhập Password
            await page.locator("//input[@id='pass1']").fill(password);
            // Chọn Role
            await page.locator("//select[@id='role']").selectOption('Editor');

            // Click button Add User
            await page.locator("//input[@id='createusersub']").click();

            // Hiển thị thông báo tạo mới user thành công
            await expect(page.locator("//div[@id='message']")).toContainText('New user created.');
        });


        await test.step('Thực hiện đăng xuất và đăng nhập lại với user name vừa tạo', async () => {
            // Đăng xuất 
            await page.locator("//li[@class='menupop with-avatar']").hover();
            await page.locator("//a[text()='Log Out']").click();

            //Đăng nhập lại
            await page.locator("//input[@id='user_login']").fill(username);
            await page.locator("//input[@id='user_pass']").fill(password);
            await page.locator("//input[@id='wp-submit']").click();

            // Kiểm tra hiển thị đúng menu
            // Các menu cần hiển thị
            const visibleMenus = [
                'Dashboard',
                'Posts',
                'Media',
                'Pages',
                'Comments',
                'Profile',
                'Tools'
            ];
            for (const menu of visibleMenus) {
                if (menu === 'Profile') {
                    await expect(page.locator(`//li[@id='menu-users']`, { hasText: menu })).toBeVisible();
                }
                else {
                    await expect(page.locator(`//li[@id='menu-${menu.toLowerCase()}']`, { hasText: menu })).toBeVisible();
                }
            }

            // Các menu không hiển thị
            const hiddenMenus = [
                'Appearance',
                'Users',
                'Plugins'
            ];
            for (const menu of hiddenMenus) {
                await expect(page.locator(`//li[@id='menu-${menu.toLowerCase()}']`, { hasText: menu })).toBeHidden();
            }
        });
    });

    test('@ACC_002: Create account with subscriber permission', async ({ page }) => {
        await test.step('Đi tới màn hình quản lý user', async () => {
            // Đi tới trang quản lý user
            await page.locator("//div[text()='Users']").click();

            // Heading "Users" visible
            await expect(page.locator("//h1[contains(text(), 'Users')]")).toBeVisible(); //await expect(page.locator('h1', { hasText: 'Users' })).toBeVisible();
            // Button "Add User" được enable
            await expect(page.locator("//a[@class='page-title-action']")).toBeEnabled();
        });

        await test.step('Thực hiện thêm mới user', async () => {
            //Click button Add User
            await page.locator("//a[@class='page-title-action']").click();

            // Nhập Username
            await page.locator("//input[@id='user_login']").fill(username);
            // Nhập Email
            await page.locator("//input[@id='email']").fill(email);
            // Nhập First Name
            await page.locator("//input[@id='first_name']").fill(firstName);
            // Nhập Last Name
            await page.locator("//input[@id='last_name']").fill(lastName);
            // Nhập Password
            await page.locator("//input[@id='pass1']").fill(password);
            // Chọn Role
            await page.locator("//select[@id='role']").selectOption('Subscriber');

            // Click button Add User
            await page.locator("//input[@id='createusersub']").click();

            // Hiển thị thông báo tạo mới user thành công
            await expect(page.locator("//div[@id='message']")).toContainText('New user created.');
        });


        await test.step('Thực hiện đăng xuất và đăng nhập lại với user name vừa tạo', async () => {
            // Đăng xuất 
            await page.locator("//li[@class='menupop with-avatar']").hover();
            await page.locator("//a[text()='Log Out']").click();

            //Đăng nhập lại
            await page.locator("//input[@id='user_login']").fill(username);
            await page.locator("//input[@id='user_pass']").fill(password);
            await page.locator("//input[@id='wp-submit']").click();

            // Kiểm tra hiển thị đúng menu
            // Các menu cần hiển thị
            const visibleMenus = [
                'Dashboard',
                'Profile'
            ];
            for (const menu of visibleMenus) {
                if (menu === 'Profile') {
                    await expect(page.locator(`//li[@id='menu-users']`, { hasText: menu })).toBeVisible();
                }
                else {
                    await expect(page.locator(`//li[@id='menu-${menu.toLowerCase()}']`, { hasText: menu })).toBeVisible();
                }
            }

            // Các menu không hiển thị
            const hiddenMenus = [
                'Appearance',
                'Users',
                'Plugins',
                'Posts',
                'Media',
                'Pages',
                'Comments',
                'Tools'
            ];
            for (const menu of hiddenMenus) {
                await expect(page.locator(`//li[@id='menu-${menu.toLowerCase()}']`, { hasText: menu })).toBeHidden();
            }
        });
    });

});
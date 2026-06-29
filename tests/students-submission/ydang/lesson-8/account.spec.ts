import { test, expect, Page } from '@playwright/test';
;

test.describe('ACCOUNT - Account', () => {
    const BASE_URL = "https://pw-practice-dev.playwrightvn.com/wp-admin";
    const ADMIN_USERNAME = 'betterbytes.academy.admin';
    const ADMIN_PASSWORD = 'StrongPass@BetterBytesAcademy';

    // Khai báo user data
    const userData = {
        username: 'k23_ydang',
        email: 'dangvannhuy1106@gmail.com',
        password: 'StrongPass@BetterBytesAcademy',
        firstName: 'k23',
        lastName: 'ydang'
    };

    async function loginAdmin(page: Page) {
        await page.goto(BASE_URL);
        await page.locator("//input[@id='user_login']").fill(ADMIN_USERNAME);
        await page.locator("//input[@id='user_pass']").fill(ADMIN_PASSWORD);
        await page.locator("//input[@id='wp-submit']").click();

        // Đợi đăng nhập thành công bằng cách kiểm tra admin bar hiển thị
        await expect(page.locator("//li[@id='wp-admin-bar-my-account']")).toBeVisible();
    }

    async function deleteUser(page: Page, username: string) {
        // Đi thẳng tới link search user bằng XPath thay vì click từng menu
        await page.goto(`${BASE_URL}/users.php?s=${username}`);
        const userRow = page.locator(`//tr[.//a[text()="${username}"]]`);

        // Chỉ thực hiện xóa nếu user thực sự tồn tại trong danh sách
        if (await userRow.count() > 0) {
            await userRow.hover();
            await userRow.locator('//a[contains(@class, "submitdelete")]').click();
            await page.waitForURL(/users\.php/);
            const deleteOption = page.locator('//input[@id="delete_option0"]');
            if (await deleteOption.isVisible()) {
                await deleteOption.click();
            }
            await page.locator('//input[@id="submit"]').click();
        }
    }

    async function addNewUser(page: Page, role: string,
        data: {
            username: string,
            email: string,
            password: string,
            firstName: string,
            lastName: string
        }) {
        //Click button Add User
        await page.locator("//a[@class='page-title-action']").click();

        // Nhập Username
        await page.locator("//input[@id='user_login']").fill(data.username);
        // Nhập Email
        await page.locator("//input[@id='email']").fill(data.email);
        // Nhập First Name
        await page.locator("//input[@id='first_name']").fill(data.firstName);
        // Nhập Last Name
        await page.locator("//input[@id='last_name']").fill(data.lastName);
        // Nhập Password
        // await page.locator("//input[@id='pass1']").fill(password);
        await page.locator("//input[@id='pass1']").clear();
        await page.locator("//input[@id='pass1']").pressSequentially(data.password);

        // Chọn Role
        await page.locator("//select[@id='role']").selectOption(role);

        // Click button Add User
        await page.locator("//input[@id='createusersub']").click();
    }

    // Đi tới trang login
    test.beforeEach(async ({ page }) => {
        // Login vào trang admin với account admin
        await loginAdmin(page);
    });

    // Teardown: Đăng nhập vào account admin và xoá account mới được tạo ra
    test.afterEach(async ({ page }) => {
        // Chỉ thực hiện đăng xuất nếu tài khoản test đang đăng nhập
        if (await page.locator("//li[@id='wp-admin-bar-my-account']").isVisible()) {
            // Lấy link logout trực tiếp từ thuộc tính href để tránh flaky của thao tác hover menu
            const logoutUrl = await page.locator("//li[@id='wp-admin-bar-logout']/a").getAttribute('href');
            await page.goto(logoutUrl!);
        }
        await loginAdmin(page);
        await deleteUser(page, userData.username);
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
            await addNewUser(page, 'Editor', userData);

            // Hiển thị thông báo tạo mới user thành công
            await expect(page.locator("//div[@id='message']")).toContainText('New user created.');
        });


        await test.step('Thực hiện đăng xuất và đăng nhập lại với user name vừa tạo', async () => {
            // Đăng xuất 
            await page.locator("//li[@class='menupop with-avatar']").hover();
            await page.locator("//a[text()='Log Out']").click();

            //Đăng nhập lại
            await page.locator("//input[@id='user_login']").fill(userData.username);
            await page.locator("//input[@id='user_pass']").fill(userData.password);
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
            await addNewUser(page, 'Subscriber', userData);

            // Hiển thị thông báo tạo mới user thành công
            await expect(page.locator("//div[@id='message']")).toContainText('New user created.');
        });


        await test.step('Thực hiện đăng xuất và đăng nhập lại với user name vừa tạo', async () => {
            // Đăng xuất 
            await page.locator("//li[@class='menupop with-avatar']").hover();
            await page.locator("//a[text()='Log Out']").click();

            //Đăng nhập lại
            await page.locator("//input[@id='user_login']").fill(userData.username);
            await page.locator("//input[@id='user_pass']").fill(userData.password);
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
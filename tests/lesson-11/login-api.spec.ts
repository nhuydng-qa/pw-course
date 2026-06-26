import { test, expect } from '@playwright/test';

test('Test 1: Login success', async ({ request }) => {
    const BASE_URL = 'https://material.playwrightvn.com/api/user-management';

    await test.step('Step 1: Đăng nhập vào tài khoản admin', async () => {
        const admin_email = "admin@example.com";
        const admin_pass = "password";
        const response = await request.post(`${BASE_URL}/v1/login.php`, {
            data: {
                "email": admin_email,
                "password": admin_pass
            }
        });

        //Verify status code = 200
        const statusCode = response.status();
        expect(statusCode).toBe(200);
        console.log(statusCode);

        //Verify access token trả về
        const responseBody = await response.json();
        const adminToken = responseBody.data.token
        expect(adminToken).toBeTruthy();
        console.log(`Admin token: ${adminToken}`);
    });

    await test.step('Step 2: Đăng nhập vào tài khoản user', async () => {
        const user_email = "jane@example.com";
        const user_pass = "password";
        const response = await request.post(`${BASE_URL}/v1/login.php`, {
            data: {
                "email": user_email,
                "password": user_pass
            }
        });

        //Verify status code = 200
        const statusCode = response.status();
        expect(statusCode).toBe(200);
        console.log(statusCode);

        //Verify access token trả về
        const responseBody = await response.json();
        const userToken = responseBody.data.token
        expect(userToken).toBeTruthy();
        console.log(`User token: ${userToken}`);
    });
});

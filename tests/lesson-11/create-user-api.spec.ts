import { test, expect } from '@playwright/test';

test('Test 2: Create user success', async ({ request }) => {
    const BASE_URL = 'https://material.playwrightvn.com/api/user-management';
    const admin_email = "admin@example.com";
    const admin_pass = "password";

    let adminToken: string = '';
    let createdUserID: number;

    const newUserData = {
        "name": "New User 10",
        "email": "newuser10@example.com",
        "password": "password",
        "facebook": "https://facebook.com/newuser10",
        "avatar": "https://i.pravatar.cc/150?img=10",
        "hobbies": "Reading, Coding, Gaming",
        "role": "user"
    }

    await test.step('Pre-condition: Đăng nhập vào tài khoản admin', async () => {
        const response = await request.post(`${BASE_URL}/v1/login.php`, {
            data: {
                "email": admin_email,
                "password": admin_pass
            }
        });
        const responseBody = await response.json();
        adminToken = responseBody.data.token;
    });

    await test.step('Step 1: Thực hiện tạo user', async () => {
        const response = await request.post(`${BASE_URL}/v1/users.php`, {
            headers: {
                'Authorization': `Bearer ${adminToken}`
            },
            data: newUserData
        });

        //Verify status code = 201
        const statusCode = response.status();
        expect(statusCode).toBe(201);
        console.log(statusCode);
        console.log("Create user successfully");

        // Verify thông tin user mới tạo ra được trả về khớp với dữ liệu test
        const responseBody = await response.json();
        expect(responseBody.success).toBe(true);
        expect(responseBody.user.name).toBe(newUserData.name);
        expect(responseBody.user.email).toBe(newUserData.email);
        console.log(responseBody.user)

        createdUserID = responseBody.user.id;
    });

    await test.step('Step 2: Thực hiện lấy danh sách user', async () => {
        const response = await request.get(`${BASE_URL}/v1/users.php`, {
            headers: { 'Authorization': `Bearer ${adminToken}` }
        });

        //Verify status code = 200
        expect(response.status()).toBe(200);

        // Kiểm tra xem trong responseBody có chứa user vừa tạo không
        const responseBody = await response.json();
        // const users = responseBody.users ?? [];
        const isUserInList = responseBody.users.some((user: any) => user.id === createdUserID);
        expect(isUserInList).toBe(true);
    });

    await test.step('Post-condition: Xoá user đã tạo', async () => {
        const response = await request.delete(`${BASE_URL}/v1/users.php`, {
            headers: { 'Authorization': `Bearer ${adminToken}` },
            data: { "id": createdUserID }
        });

        const responseBody = await response.json();
        console.log(responseBody.deleted.message);
    });
});

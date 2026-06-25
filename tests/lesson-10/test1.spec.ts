import { test, expect } from '@playwright/test';
import { RegisterPage } from './01-pom';

test('Test 1: Register page', async ({ page }) => {
    const registerPage = new RegisterPage(page);

    const userTestData = {
        username: 'ydang',
        email: 'test@gmail.com',
        gender: 'Female' as 'Female',
        hobbies: { reading: true, traveling: true, cooking: false },
        interests: ['technology', 'music'],
        country: 'canada',
        dob: '2003-06-11',
        filePath: 'tests/lesson-05/avatar.jpg',
        bio: 'Đây là đoạn text chạy bằng mô hình POM.'
    };

    await test.step('Đi tới trang chủ và click vào Bài học 1: Register Page', async () => {
        await registerPage.goto();
    });

    await test.step('a. Nhập thông tin đăng ký', async () => {
        await registerPage.fillRegisterForm(userTestData);
    });

    await test.step('b. Click button Register', async () => {
        await registerPage.clickRegister();
    });

    // Kiểm tra nội dung đã đăng ký
    await test.step('Kiểm tra nội dung đã đăng ký ở bảng', async () => {

        // Kiểm tra username và email
        await expect(registerPage.registeredUsername).toHaveText(userTestData.username);
        await expect(registerPage.registeredEmail).toHaveText(userTestData.email);

        //Kiểm tra các thông tin khác trong cột Information
        await expect(registerPage.registeredInfo).toContainText(`Gender: ${userTestData.gender.toLowerCase()}`);
        await expect(registerPage.registeredInfo).toContainText(`Country: ${userTestData.country}`);
        await expect(registerPage.registeredInfo).toContainText(`Date of Birth: ${userTestData.dob}`);
        await expect(registerPage.registeredInfo).toContainText(`Biography: ${userTestData.bio}`);
        for (const hobbyName of Object.keys(userTestData.hobbies) as Array<keyof typeof userTestData.hobbies>) {
            if (userTestData.hobbies[hobbyName] === true) {
                await expect(registerPage.registeredInfo).toContainText(hobbyName);
            }
        }
    });
});
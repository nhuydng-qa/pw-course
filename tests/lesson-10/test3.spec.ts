import { test, expect } from '@playwright/test';
import { TodoPage } from './01-pom';

test('Test 3: Todo List', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await test.step('Đi tới trang chủ và click vào Bài học 3: Todo Page', async () => {
        await todoPage.goto()
    });

    await test.step('a. Thêm mới 100 todo item có nội dung "Todo <i>"', async () => {
        for (let i = 1; i <= 100; i++) {
            await todoPage.addTodoTask(`Todo ${i}`);
        }
    });

    await test.step('b. Xóa các todo có sổ lẻ', async () => {
        page.on('dialog', async dialog => dialog.accept());
        for (let i = 1; i <= 99; i += 2) {
            await todoPage.deleteTodoTask(`Todo ${i}`);
        }
    });

    await test.step('c. Kiểm tra todo có số thứ tự 90 nằm trong viewport', async () => {
        await expect(todoPage.getTaskLocator("Todo 90")).toBeVisible();
    });

    await test.step('c. Kiểm tra todo có số thứ tự 21 bị ẩn', async () => {
        await expect(todoPage.getTaskLocator("Todo 21")).toBeHidden();
    });
});
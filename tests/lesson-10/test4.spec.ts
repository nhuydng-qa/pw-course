import { test, expect } from '@playwright/test';
import { PersonalNotePage } from './01-pom';

test('Test 4: Personal Notes', async ({ page }) => {
    const personalNotes = new PersonalNotePage(page);
    let newsData: { title: string, description: string }[] = [];

    await test.step('a. Truy cập VnExpress và lấy thông tin 10 bài báo', async () => {
        await page.goto('https://vnexpress.net/khoa-hoc');
        const articleList = await page.locator('article.item-news');

        for (let i = 0; i < 10; i++) {
            let article = articleList.nth(i);
            let titleText = await article.locator('.title-news a').innerText();
            let descriptionText = await article.locator('p.description > a').innerText();

            newsData.push({
                title: titleText.trim(),
                description: descriptionText.trim()
            });
        }
        console.log("Get the news information successfully!")
    });

    await test.step('Đi tới trang chủ và click vào Bài học 4: Personal notes', async () => {
        await personalNotes.goto();
    });

    await test.step('a. Thêm mới 10 note có nội dung là tiêu đề và một phần ngắn (khoảng 3 dòng) tại báo VnExpress', async () => {
        for (const news of newsData) {
            await personalNotes.addNote(news.title, news.description);
        }
    });

    const keyword = "AI";

    await test.step('b. Thực hiện search theo keyword bất kì', async () => {
        await personalNotes.searchNote.fill(keyword);
    });

    await test.step('c. Kiểm tra tất cả các bài báo search được đều chứa keyword đã tìm kiếm', async () => {
        const noteCount = await personalNotes.noteTitles.count();
        expect(noteCount).toBeGreaterThan(0);
        for (let i = 0; i < noteCount; i++) {
            const title = await personalNotes.noteTitles.nth(i).innerText();
            const content = await personalNotes.noteContents.nth(i).innerText();
            const fullText = `${title} ${content}`.toLowerCase();
            expect(fullText).toContain(keyword.toLowerCase());
        }
    });
});
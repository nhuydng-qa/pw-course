# Key Takeaways - Lesson 08: Playwright Tests

## 1. Test Group / Test Suite (`test.describe`)
* **Khái niệm:** Test suite là một tập hợp gồm nhiều test cases.
* **Mục đích:** Giúp **nhóm các test có liên quan lại với nhau** để dễ dàng quản lý, bảo trì và tổ chức code.
* **Cú pháp trong Playwright:** Sử dụng hàm `test.describe()` để bao bọc các khối `test()` bên trong.
    ```typescript
    test.describe('<tên suite>', async () => {
        test('test 1', async ({ page }) => { 
            // Code của test 1... 
        });
        test('test 2', async ({ page }) => { 
            // Code của test 2... 
        });
    });
    ```

## 2. Test Hooks
* **Khái niệm:** Hooks là các khối code được thiết lập để chạy vào những thời điểm cụ thể trong vòng đời của một test: **Trước khi chạy**, **Trong khi chạy**, hoặc **Sau khi chạy**.
* **Các loại hooks phổ biến trong Playwright:**
    * `beforeAll`: Chạy **một lần duy nhất** trước khi tất cả các test trong suite bắt đầu.
    * `beforeEach`: Chạy **trước mỗi** một test case.
    * `afterEach`: Chạy **sau mỗi** một test case.
    * `afterAll`: Chạy **một lần duy nhất** sau khi tất cả các test trong suite đã hoàn thành.

## 3. Assertion & Web-first Assertion
* **Khái niệm Assertion:** Là một câu lệnh dùng để **"khẳng định" hoặc "xác nhận"** xem một điều kiện, một kết quả có đúng như mong đợi hay không. 
* **Tại sao cần Assertion:** Nếu không có assertion, công cụ test sẽ chỉ thực hiện hành động (như click chuột, điền text) mà **không biết test case đó thực sự thành công hay thất bại**. Ví dụ: Hành động là `await page.click('button')`, còn assertion là kiểm tra xem sau khi click, bảng thông báo có hiển thị hay không `await expect(page.locator('button')).toBeVisible()`.

### 3.1. Generic Assertions (Khẳng định chung)
* Thường được lấy từ thư viện `expect`, dùng để so sánh các giá trị thông thường: `expect(giá trị thực tế) = (giá trị mong đợi)`.
* **Các ví dụ phổ biến:**
    * So sánh giá trị: `expect(value).toBe(expected);`.
    * Độ dài mảng: `expect(array).toHaveLength(3);`.
    * Kiểm tra chuỗi: `expect(string).toContain('text');`.

### 3.2. Web-first Assertions (Khẳng định trên Web với Auto-waiting)
* Đây là các câu lệnh thiết kế riêng cho việc kiểm tra các phần tử (elements) trên giao diện web. Chúng có cơ chế **auto-waiting (tự động chờ)** thông minh.
* **Bản chất auto-waiting:** Khác với việc "chờ cứng" (hard wait) luôn tốn đúng số giây cài đặt, auto-waiting sẽ **chờ linh hoạt (flexible) tối đa 5 giây**. Nếu điều kiện đạt được sớm (ví dụ sau 1 giây), code sẽ chạy tiếp ngay lập tức; nếu quá 5 giây mà không thỏa mãn thì mới báo lỗi.
* **Các hàm Web-first Assertions thông dụng:**
    * **Element State (Trạng thái phần tử):**
        * Hiển thị / Ẩn: `.toBeVisible()`, `.toBeHidden()`.
        * Có thể / Không thể tương tác: `.toBeEnabled()`, `.toBeDisabled()`.
        * Được check (dành cho checkbox/radio): `.toBeChecked()`.
        * Đang được focus: `.toBeFocused()`.
    * **Text & Content (Nội dung):**
        * Chứa một chuỗi text (chứa một phần): `.toContainText('Hello')`.
        * Khớp chính xác chuỗi text: `.toHaveText('Welcome')`.
        * Kiểm tra text của nhiều phần tử cùng lúc: `.toHaveText(['Item 1', 'Item 2'])`.
    * **Attributes & Properties (Thuộc tính):**
        * Kiểm tra thuộc tính cụ thể: `.toHaveAttribute('href', '/about')`.
        * Kiểm tra class: `.toHaveClass('active')`.
        * Kiểm tra giá trị ô input: `.toHaveValue('john@example.com')`.
        * Đếm số lượng phần tử: `.toHaveCount(5)`.
    * **Page Assertions (Thông tin trang):**
        * Kiểm tra URL hiện tại: `.toHaveURL('https://...')`.
        * Kiểm tra Tiêu đề (Title) của trang: `.toHaveTitle('My App')`.
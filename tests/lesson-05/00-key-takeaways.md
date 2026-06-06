# Key Takeaways - Lesson 05: DOM, Selector & Playwright Basic

## 1. DOM (Document Object Model)
*   **Khái niệm:** DOM là viết tắt của Document Object Model, là một cấu trúc dạng cây đại diện cho toàn bộ các phần tử (elements) trên một trang web.
*   **Cách xem DOM:** Trên trình duyệt, bấm phím `F12` (hoặc chuột phải chọn `Inspect`), sau đó chọn tab **Elements**.
*   **Cấu trúc của một Element:** Gồm 3 phần chính: Thẻ (Tag), Thuộc tính (Attribute), và Nội dung (Text).
    *   *Ví dụ:* `<option value="usa">United States</option>`
        *   Tag: `option`
        *   Attribute (Thuộc tính & Giá trị): `value="usa"`
        *   Text: `United States`
*   **Các thẻ HTML thường gặp:**
    *   **Khung trang:** `<html>`, `<head>`, `<body>`.
    *   **Bố cục (Layout):** `<div>`, `<header>`, `<footer>`, `<nav>`, `<section>`.
    *   **Nội dung & Media:** `<h1>` đến `<h6>`, `<p>`, `<ul>`, `<li>`, `<a>` (link), `<img>` (ảnh).
    *   **Form (Rất quan trọng trong Testing):** `<form>`, `<input>`, `<button>`, `<select>`, `<option>`, `<textarea>`.

## 2. Selector (Bộ định vị)
*   **Mục đích:** Để auto thao tác (click, điền text...) được trên web, công cụ cần phải **tìm (locate)** được phần tử đó thông qua các Selectors.
*   **Có 3 loại selector thường dùng:** XPath, CSS Selector, và Playwright selector.
*   **Thứ tự ưu tiên nên dùng:** Playwright selector > CSS Selector > XPath.
*   **Chi tiết về XPath:**
    *   **XPath Tuyệt Đối (Dùng dấu `/`):** Bắt đầu từ gốc (root) đi xuống (vd: `/html/body/div/input`). Rất dễ bị lỗi (flaky) khi cấu trúc web thay đổi, **KHÔNG NÊN DÙNG**.
    *   **XPath Tương Đối (Dùng dấu `//`):** Bắt đầu từ bất kỳ đâu trong DOM (vd: `//input[@id='user']`). Rất linh hoạt, chiếm 99% trường hợp sử dụng, **NÊN DÙNG**.

## 3. Cú pháp Playwright Cơ Bản (Playwright Basic Syntax)
Bản chất của Automation Test là tìm phần tử (tương tác) + kiểm tra kết quả (verify).

**Cấu trúc một file Test:**
```typescript
import { test } from '@playwright/test';

// Khai báo một test case
test('<Tên test>', async ({ page }) => {
    
    // Test step: Gom nhóm các hành động cho dễ bảo trì
    await test.step('Tên step', async () => {
       // Code thao tác nằm ở đây
    });
    
});
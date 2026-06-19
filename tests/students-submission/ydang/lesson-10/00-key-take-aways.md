# Key Takeaways - Lesson 10: TypeScript & Page Object Model (POM)

## 1. TypeScript cơ bản
*   **Khái niệm:** TypeScript (TS) là một "superset" (tập hợp siêu) của JavaScript, nghĩa là nó mở rộng thêm các tính năng cho JavaScript.
*   **Ưu điểm so với JavaScript:**
    *   Có hệ thống kiểu dữ liệu (Data types) rõ ràng.
    *   Giúp IDE gợi ý code tốt hơn và phát hiện lỗi sớm ngay trong lúc viết code.
    *   Hỗ trợ mạnh mẽ các tính năng của Lập trình hướng đối tượng (OOP) như Interface, Class, Kế thừa....
*   **Định nghĩa kiểu dữ liệu (Define type):**
    *   Giúp code rõ ràng, dễ đọc hơn.
    *   Có thể dùng từ khóa `type` hoặc `interface` để định nghĩa. 
    *   *Lưu ý cú pháp:* Khai báo `interface` **không** có dấu `=` (VD: `interface User { ... }`), trong khi `type` thì bắt buộc có dấu `=` (VD: `type User = { ... }`).

## 2. Lập trình Hướng đối tượng (OOP) trong TypeScript
*   **Class (Lớp):**
    *   Dùng để mô hình hoá một đối tượng thực tế. Một class bao gồm: **Thuộc tính (Properties)** mô tả các đặc tính, và **Hành vi (Methods)** mô tả các hành động mà đối tượng có thể thực hiện.
    *   Sử dụng class giúp gói gọn các thuộc tính và phương thức "dính liền" vào đối tượng, giúp code không bị rải rác, dễ quản lý và khởi tạo dễ dàng thông qua từ khóa `new`.
*   **Kế thừa (`extends`):**
    *   Là cơ chế cho phép một class (class con) "thừa hưởng" toàn bộ các thuộc tính và phương thức từ một class khác (class cha).
    *   Hàm **`super()`**: Được gọi bên trong `constructor` của class con để thực thi hàm tạo của class cha.

## 3. Page Object Model (POM)
*   **Khái niệm:** POM là một *design pattern* (mẫu thiết kế) nhằm tạo ra một cấu trúc code automation test "sạch đẹp, dễ bảo trì".
*   **Core Concept (Bản chất):** 
    *   **Mỗi một trang web (page) sẽ được viết thành một Class riêng biệt**.
    *   **Properties (Thuộc tính):** Lưu trữ các bộ định vị (Locators) của các thành phần trên trang web đó (VD: `#username`, `#password`).
    *   **Methods (Phương thức):** Chứa các hành động thao tác trên trang web đó (VD: `fillUsername`, `clickLogin`). Các method này luôn nên **bắt đầu bởi một động từ**.
*   **Tại sao nên dùng POM?**
    *   **Dễ bảo trì (Maintainability):** Nếu UI/locator thay đổi, ta chỉ cần vào duy nhất file Class của page đó để sửa, thay vì phải tìm và sửa rải rác ở hàng loạt các file test khác nhau.
    *   **Code dễ đọc hơn (Readability):** Tách biệt phần tìm element (locator) và phần logic test, giúp kịch bản test gọn gàng.
    *   **Tái sử dụng code (Reusability):** Các method thao tác có thể được gọi đi gọi lại ở nhiều file test case khác nhau.
*   **Lưu ý:** Không có một tiêu chuẩn POM nào là duy nhất. Cách viết POM sẽ linh hoạt phụ thuộc vào Framework, ngôn ngữ lập trình, kinh nghiệm và sở thích của team/author.
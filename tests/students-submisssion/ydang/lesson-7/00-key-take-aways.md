# Key Takeaways - Lesson 07: Selector Advanced

## 1. Các mối quan hệ trong DOM (DOM Relations)
Hiểu rõ mối quan hệ giữa các node trong cây DOM là cơ sở để viết XPath tương đối một cách chính xác:
*   **self:** Node hiện tại.
*   **parent:** Node cha, nằm ngay phía trên trực tiếp của node hiện tại.
*   **children:** Node con, nằm ngay phía dưới trực tiếp của node hiện tại.
*   **ancestor:** Tổ tiên (bao gồm cha, cha của cha, v.v.).
*   **descendant:** Hậu duệ (bao gồm con, cháu, chắt, v.v.).
*   **sibling:** Anh em (những phần tử cùng cấp và cùng chung một node cha).
*   **following:** Theo sau (gồm các node ở phía bên tay phải của node hiện tại, **không** lấy những node con của node hiện tại).
*   **preceding:** Phía trước (gồm các node ở phía bên tay trái của node hiện tại, **trừ** các node tổ tiên - ancestor).
*   **following-sibling:** Anh em phía sau (= following + sibling).
*   **preceding-sibling:** Anh em phía trước (= preceding + sibling).

## 2. XPath Axes Methods (Phương thức trục XPath)
**Mục đích:** Là các phương pháp để điều hướng và chọn node trong cây DOM dựa trên mối quan hệ giữa chúng. Việc này giúp tìm kiếm element linh hoạt hơn nhiều so với việc chỉ dùng đường dẫn tuyệt đối hoặc tương đối thông thường.

**Các phương thức trục phổ biến:**
*   **Wildcard (`*`):** Khớp với tất cả các loại thẻ. Vd: `//*` (khớp mọi thẻ), `//div` (chỉ khớp thẻ div).
*   **`child`:** Tìm con trực tiếp. Vd: `//form[@id='test-form']/child::button`.
*   **`descendant`:** Tìm tất cả con cháu (mọi cấp độ). Vd: `//form[@id='test-form']/descendant::input`.
*   **`parent`:** Tìm node cha. Vd: `//button[text()='Create Test Case']/parent::form`.
*   **`ancestor`:** Tìm tổ tiên. Vd: `//button[@class='btn-edit']/ancestor::table`.
*   **`following-sibling`:** Tìm anh em cùng cấp nằm phía sau. Vd: `//label[@for='testName']/following-sibling::input`.
*   **`preceding-sibling`:** Tìm anh em cùng cấp nằm phía trước. Vd: `//button[@class='btn-reset']/preceding-sibling::button`.
*   **`following`:** Tìm tất cả các node nằm phía sau trong toàn bộ document. Vd: `//h2[text()='Test Cases List']/following::button[@class='btn-run']`.
*   **`preceding`:** Tìm tất cả các node nằm phía trước trong toàn bộ document. Vd: `//h2[text()='...']/preceding::td[@class='priority-high']`.
*   **`ancestor-or-self` / `descendant-or-self`:** Tìm tổ tiên hoặc con cháu, **bao gồm cả chính node hiện tại** nếu nó thỏa mãn điều kiện.

## 3. Các phương thức XPath nâng cao khác (Advance Methods)
Bên cạnh Axes, XPath hỗ trợ nhiều hàm và toán tử để xác định element chính xác:
*   **Chứa thuộc tính (`@`):** Sử dụng `@` để truy cập vào thuộc tính của element. Vd: `//tagname[@attribute='value']`.
*   **Toán tử Logic (`AND`, `OR`):**
    *   **AND:** Tất cả điều kiện phải đúng. Vd: `//element[@condition1 and @condition2]`.
    *   **OR:** Một trong các điều kiện đúng. Vd: `//element[@condition1 or @condition2]`.
*   **Lấy text (`text()`):** Lấy text node trực tiếp của element. Cú pháp: `//element[text()='exact text']`.
*   **Chuẩn hóa khoảng trắng (`normalize-space()`):** Dùng để loại bỏ các khoảng trắng thừa ở đầu, cuối và giữa text, rất hữu ích khi text trên web bị format có nhiều dấu cách/xuống dòng.
*   **Kiểm tra chuỗi con (`contains()`):** Tìm element có chứa một phần text (không cần khớp chính xác toàn bộ).
    *   Dùng với thuộc tính: `//element[contains(@attribute, 'substring')]`.
    *   Dùng với text: `//element[contains(text(), 'substring')]`.
# Key Takeaways - Lesson 03: Git & JavaScript Basic (continue)

## 1. Git Nâng Cao
* **Undo (Hoàn tác):**
  * Sửa message commit cuối: `git commit --amend -m"<message>"`.
  * Un-stage file (Staging -> Working Directory): `git restore --staged <file>`.
  * Un-commit về Staging: `git reset --soft HEAD~1`.
  * Un-commit về Working Directory: `git reset HEAD~1`.
  * **Lưu ý**: Commit đầu tiên không thể reset, nếu muốn reset phải xoá thư mục .git và init lại từ đầu
* **Branching (Phân nhánh):**
  * **Mục đích:** Tạo môi trường làm việc song song, độc lập, không ảnh hưởng code đang chạy ổn định. 
  * **Bản chất:** Branch chỉ là một con trỏ (pointer) trỏ đến một commit.
  * **Lệnh cơ bản:** `git branch` (tạo/xem), `git checkout` (chuyển), `git checkout -b` (tạo & chuyển), `git branch -D` (xóa local), `git push -D origin <tên_nhánh>` (xóa remote), `git push origin <tên_nhánh>` (đưa lên remote - GitHub).
* **.gitignore:**
  * Khai báo các file/folder Git **không được theo dõi** (untracked) như: thư viện (`node_modules`), file nhạy cảm (passwords), file tạm.

## 2. JavaScript Basic
* **NodeJS:** Trình duyệt có sẵn engine để chạy JS, nhưng để chạy JS trực tiếp trên máy tính mà không cần trình duyệt, ta dùng NodeJS.
* **Thực thi file JS:** Mở terminal gõ cú pháp `node <đường dẫn tới file>` (ví dụ: `node 00-hello.js`).
* **Biến (Variables) và Hằng (Constants):**
  * **`let` (Biến):** Giá trị có thể thay đổi. An toàn hơn `var` (được ra đời sau, là block code scope, không cho phép khai báo lại trùng tên tránh gây nhầm lẫn).
  * **`const` (Hằng):** Giá trị không thay đổi được (chỉ dùng 1 lần).
  * **Quy tắc sử dụng:** Mặc định luôn dùng `const` để code an toàn/dễ đọc hơn. Chỉ dùng `let` khi chắc chắn cần gán lại giá trị. **Không dùng `var`**.
* **Kiểu dữ liệu (Data Types):**
  * Nguyên thuỷ (Primitive): Number, String, Boolean, Undefined, Null, Symbol, BigInt.
  * Tham chiếu (Reference): Object.
  * Dùng hàm `typeof <tên_biến>` để kiểm tra kiểu dữ liệu của biến.
* **Toán tử (Operators):**
  * **So sánh:** Khuyên dùng **`===`** (Strict Equality - so sánh cả giá trị và kiểu dữ liệu). Không nên dùng `==` (Loose Equality - tự động chuyển đổi kiểu dữ liệu trước khi so sánh).
  * **Logic:** `&&` (AND - trả về đúng nếu **cả 2 vế** đều đúng), `||` (OR - trả về đúng nếu **1 trong 2 vế** đúng).
  * **Một ngôi:** Tăng/giảm giá trị (`++`, `--`). Tiền tố (Prefix: `++x`) và Hậu tố (Postfix: `x++`) => Pre-increment (Tăng trước - dùng Prefix) và Post-increment (Tăng sau - dùng Postfix) khác nhau ở chỗ:
    * **x++** (Post-increment): Trả về giá trị hiện tại của i trước, rồi mới tăng i lên 1 đơn vị. (Trả về trước, tăng sau).
    * **++x** (Pre-increment): Tăng i lên 1 đơn vị trước, rồi mới trả về giá trị mới của i. (Tăng trước, trả về sau).
* **Câu điều kiện (Conditionals):** 
  * Kiểm tra logic trước khi thực thi. Nếu điều kiện đúng thì mới chạy.
  * Các loại: `if`, `if...else`, `switch...case`.
* **Vòng lặp (Loops):** 
  * Lặp lại 1 đoạn logic nhiều lần. Các loại: `for`, `while`, `do...while`.
  * Cú pháp `for (i)`: `for (<khởi tạo>; <điều kiện>; <cập nhật>) { // code }`.
* **Coding Convention (Quy tắc code):** 
  * Định dạng code chung giúp team làm việc dễ dàng hơn.
  * `kebab-case`: Dùng đặt tên file/folder (vd: `y-dang`).
  * `camelCase`: Dùng đặt tên biến/hàm (vd: `yDang`).
  * `PascalCase`: Dùng đặt tên class (vd: `YDang`).
* **Console.log nâng cao:** 
  * In chuỗi kết hợp với biến bằng dấu `+` hoặc dùng template literals với backtick (`` `...${biến}...` ``)
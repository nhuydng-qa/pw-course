# Key Takeaways - Lesson 11: API Testing

## 1. Tổng quan về API
* **API là gì:** Viết tắt của *Application Programming Interface*. Đây là bộ quy tắc giúp các phần mềm giao tiếp với nhau. API đóng vai trò như một "cầu nối" hoặc "hợp đồng", giúp các hệ thống khác nhau (vd: Client và Server) làm việc cùng nhau mà không cần biết chi tiết bên trong của nhau.
* **Tại sao cần test API?**
    * **Đảm bảo hoạt động đúng:** Kiểm tra xem dữ liệu trả về có chính xác và logic xử lý có đúng thiết kế không.
    * **Phát hiện lỗi sớm:** Bắt bug ở tầng dưới trước khi chúng hiển thị và ảnh hưởng đến frontend (người dùng cuối).
    * **Bảo mật & Hiệu năng:** Đảm bảo không bị truy cập trái phép, không lộ dữ liệu nhạy cảm và chịu tải được nhiều request cùng lúc.
    * **Dễ bảo trì:** Tránh phụ thuộc, khi sửa code có thể chạy lại test ngay để đảm bảo không làm hỏng tính năng cũ.

## 2. Các thành phần của API
* **Endpoint (URL):** Địa chỉ để truy cập vào tài nguyên.
* **HTTP Method:** Phương thức để thực hiện thao tác.
    * `GET`: Lấy dữ liệu.
    * `POST`: Tạo mới dữ liệu.
    * `PUT/PATCH`: Cập nhật dữ liệu.
    * `DELETE`: Xóa dữ liệu.
* **Request (Yêu cầu gửi đi):** Bao gồm:
    * *Headers:* Các thông tin bổ sung như token xác thực, content-type.
    * *Parameters:* Tham số truyền trên URL (query params).
    * *Body:* Dữ liệu gửi lên (thường dùng định dạng JSON, XML).
* **Response (Phản hồi trả về):** Bao gồm:
    * *Status Code:* Mã trạng thái (vd: `200 OK` - thành công, `404 Not Found` - không tìm thấy, `500 Error` - lỗi server).
    * *Headers:* Thông tin phản hồi từ server.
    * *Body:* Dữ liệu trả về (thường là định dạng JSON).
* **API Documentation:** Tài liệu hướng dẫn sử dụng API (ví dụ công cụ phổ biến nhất là **Swagger**).

## 3. Định dạng dữ liệu JSON
* **Khái niệm:** JSON (JavaScript Object Notation) là định dạng dữ liệu phổ biến nhất để trao đổi thông tin giữa Client và Server vì nó nhẹ, truyền tải nhanh và dễ đọc cho cả người lẫn máy.
* **Cấu trúc cơ bản:** 
    * Được xây dựng theo cặp `key-value` đặt trong dấu ngoặc nhọn `{}` (Rất giống với Object trong JavaScript).
    * **Lưu ý quan trọng:** `key` luôn luôn phải là kiểu `string` và được đặt trong dấu ngoặc kép `""`. Các key không được trùng nhau.
    * `value` có thể chứa các kiểu dữ liệu như: String (trong ngoặc kép), Number, Boolean, Null, Object `{}`, hoặc Array `[]`.
    * Các cặp key-value phải được phân cách bằng dấu phẩy `,`, nhưng **không có dấu phẩy ở phần tử cuối cùng**.

## 4. Công cụ test API (Postman)
* **Postman** là công cụ giao diện trực quan dùng để gửi request và nhận response từ API (ngoài ra có thể dùng `cURL` trên terminal).
* **Các thành phần chính trên giao diện Postman:**
    * *Sidebar (Bên trái):* Quản lý **Collections** (tổ chức các API thành nhóm), **Environments** (quản lý biến môi trường dev/staging/prod), History...
    * *Main Workspace (Giữa):* Nơi làm việc chính để chọn HTTP Method, nhập URL, setup Params, Headers, Body, và bấm nút **Send** để xem kết quả.

## 5. API Testing với Playwright
* **Sử dụng `request` fixture:** Playwright cho phép gọi API trực tiếp trong code (không cần thao tác qua UI trình duyệt) thông qua fixture `request`.
    * *Cú pháp cơ bản:* `const response = await request.get('<URL>');` (lấy kết quả gán vào biến response),.
* **Xử lý API có Authentication (Xác thực):** Quá trình này thường gồm 2 bước,:
    1. Gọi API đăng nhập với thông tin username/password để nhận về một chuỗi `token`.
    2. Lấy chuỗi `token` đó gán vào `header` của các API tiếp theo. (Nếu gọi các API cần quyền truy cập mà thiếu token ở header thì sẽ gặp lỗi báo không có quyền, ví dụ lỗi 401),.
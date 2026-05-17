# Key Takeaways - Lesson 02: Git & JavaScript Basic

## 1. Version Control System (VCS) & Git
* **VCS (Hệ thống quản lý phiên bản):** Giúp quản lý code dễ dàng, xem lại lịch sử thay đổi (ai, sửa gì, khi nào) và khôi phục các phiên bản cũ.
* **Git vs GitHub:** 
  * Git: Công cụ (phần mềm) quản lý phiên bản cài trên máy tính.
  * GitHub: Dịch vụ web để lưu trữ, upload các Git repository.
* **3 Trạng thái của Git (Three states):** 
  * Working Directory (Đang làm việc) -> Staging Area (Chuẩn bị) -> Repository (Đã lưu trữ thành phiên bản).
  * Quy ước về vùng Local: Vùng local là vùng khi một thư mục chưa được khởi tạo git (chưa gõ lệnh git init). Lúc này, tất cả các file sẽ nằm ở trong vùng local. Sau khi init, file sẽ di chuyển từ vùng local vào vùng.
working directory.
* **Các lệnh Git cơ bản:**
  * `git init`: Khởi tạo repo local (chỉ làm 1 lần).
  * Cấu hình định danh: `git config --global user.name "<tên>"` và `git config --global user.email "<email>"`.
  * `git status`: Xem trạng thái file (xanh: ở staging, đỏ: ở working directory).
  * `git add .`: Đưa file từ Working Directory vào Staging Area.
  * `git commit -m "<message>"`: Lưu phiên bản từ Staging vào Repository.
  * `git push origin main`: Đẩy code từ local lên GitHub.
  * `git log`: Xem lịch sử danh sách các commit.
* **Commit Convention:** Cú pháp viết message quy chuẩn `<type>: <short_description>`.
  * `chore`: sửa nhỏ lẻ, xóa file, v.v..
  * `feat`: thêm tính năng mới.
  * `fix`: sửa lỗi.

  --Update
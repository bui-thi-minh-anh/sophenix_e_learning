# Quản lý trạng thái (State) ở Frontend

> Cách quản lý state trên nền **Next.js + React**. Hiện mới có phần nền giao diện nên state còn rất ít; tài liệu nêu nguyên tắc và định hướng khi thêm nghiệp vụ.

## 1. Nguyên tắc

- **Ưu tiên Server Component** (mặc định của App Router): không giữ state, chỉ render. Dùng cho nội dung tĩnh/đọc dữ liệu.
- **Chỉ dùng Client Component khi cần tương tác** (state, sự kiện, hook): đánh dấu `"use client"` ở đầu file.
- **State cục bộ trước**: dùng `useState`/`useReducer` trong component. Chỉ nâng lên context/store khi nhiều nơi thật sự cần chia sẻ.
- **URL là nguồn sự thật cho điều hướng**: tham số route/query thay cho việc tự lưu "đang ở trang nào".

## 2. State hiện có (foundation)

| State | Nơi giữ | Kiểu |
| --- | --- | --- |
| Mở/đóng Sidebar trên mobile | `MainLayout` (`useState`) | Client component |
| Chế độ sáng/tối | `next-themes` (qua `ThemeProvider`) | Lưu ở `localStorage`, áp class lên `<html>` |
| Trang đang mở (active nav) | Đọc từ URL bằng `usePathname()` trong `Sidebar` | Không lưu thêm |

> Theme là state "toàn cục" duy nhất hiện tại, và do thư viện `next-themes` lo (gồm cả việc nhớ lựa chọn giữa các lần truy cập).

## 3. Định hướng khi thêm nghiệp vụ

| Nhu cầu | Hướng xử lý |
| --- | --- |
| Đọc danh sách / chi tiết bài học | Server Component đọc `src/data/lessons.json` (hoặc Route Handler `src/app/api/...`) |
| Làm bài tập, chấm điểm trong một trang | `useState`/`useReducer` cục bộ trong Client Component |
| Lưu tiến độ giữa các phiên | `localStorage` (xem [LOCAL_STORAGE.md](LOCAL_STORAGE.md)) |
| Chia sẻ state nhiều màn hình | React Context nhỏ; cân nhắc Zustand nếu phức tạp dần |
| Dữ liệu từ server cần cache/đồng bộ | Cân nhắc thư viện data-fetching khi thật sự cần |

> Nguyên tắc: chỉ thêm độ phức tạp (context/store/thư viện) khi nhu cầu thực sự đòi hỏi.

## Liên kết liên quan

- localStorage đề xuất: [LOCAL_STORAGE.md](LOCAL_STORAGE.md)
- Kiến trúc: [TECH_ARCHITECTURE.md](TECH_ARCHITECTURE.md)

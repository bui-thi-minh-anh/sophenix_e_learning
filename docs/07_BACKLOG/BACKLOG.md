# Backlog — Sophenix

> Tài liệu này liệt kê các hạng mục công việc theo thứ tự ưu tiên. Cập nhật trạng thái khi triển khai.

## Quy ước

- **Ưu tiên**: Cao / Trung bình / Thấp.
- **Trạng thái**: Hoàn thành / Đang làm / Chưa làm / Định hướng tương lai.
- Cột "GĐ" tham chiếu giai đoạn trong [Roadmap](../01_PRODUCT/ROADMAP.md).

## Bảng backlog

| ID | Hạng mục | Mô tả | GĐ | Ưu tiên | Trạng thái |
| --- | --- | --- | --- | --- | --- |
| BL-01 | Server Express | Khởi tạo server, cổng 3000, phục vụ `public/` | 1 | Cao | Hoàn thành |
| BL-02 | API danh sách | `GET /api/lessons` trả tóm tắt | 1 | Cao | Hoàn thành |
| BL-03 | API chi tiết | `GET /api/lessons/:id` trả đầy đủ | 1 | Cao | Hoàn thành |
| BL-04 | Dữ liệu JSON | Cấu trúc `lessons.json` + 2 bài mẫu | 1 | Cao | Hoàn thành |
| BL-05 | Trang danh sách | UI hiển thị bài từ API | 1 | Cao | Đang làm |
| BL-06 | Trang chi tiết | UI lecture + vocabulary song ngữ | 1 | Cao | Đang làm |
| BL-07 | Bài tập Listening | Hiển thị + TTS cho `audioText` | 2 | Cao | Chưa làm |
| BL-08 | Bài tập Speaking | Prompt + speech recognition | 2 | Cao | Chưa làm |
| BL-09 | Bài tập Reading | Passage + câu hỏi trắc nghiệm | 2 | Cao | Chưa làm |
| BL-10 | Bài tập Writing | Prompt + minWords + sampleAnswer | 2 | Cao | Chưa làm |
| BL-11 | Chấm điểm quiz | So đáp án, hiển thị kết quả | 2 | Cao | Chưa làm |
| BL-12 | Nghe phát âm từ vựng | Nút TTS cho từng từ | 2 | Trung bình | Chưa làm |
| BL-13 | Thêm bài học | Bổ sung nội dung A1–B1 | 2 | Trung bình | Chưa làm |
| BL-14 | Responsive UI | Hiển thị tốt trên màn nhỏ | 2 | Trung bình | Chưa làm |
| BL-15 | Xử lý lỗi API | Thông báo khi không tìm thấy bài | 2 | Trung bình | Chưa làm |
| BL-16 | Đăng nhập người dùng | Đăng ký/đăng nhập | 3 | Thấp | Định hướng tương lai |
| BL-17 | Theo dõi tiến độ | Lưu bài đã học, điểm quiz | 3 | Thấp | Định hướng tương lai |
| BL-18 | Từ vựng yêu thích | Lưu/bỏ lưu từ theo người dùng | 3 | Thấp | Định hướng tương lai |
| BL-19 | Chuyển sang DB | Thay file JSON bằng cơ sở dữ liệu | 3 | Thấp | Định hướng tương lai |
| BL-20 | Gợi ý học (AI) | Gợi ý bài/từ phù hợp | 4 | Thấp | Định hướng tương lai |
| BL-21 | Gamification | Điểm, huy hiệu, streak | 4 | Thấp | Định hướng tương lai |

## Ghi chú

- Ưu tiên hoàn thiện GĐ1–GĐ2 (nội dung + quiz chấm điểm) trước khi mở rộng sang GĐ3–GĐ4.
- Các hạng mục **định hướng tương lai** chỉ là dự kiến, có thể thay đổi.

## Liên kết liên quan

- [MVP](MVP.md)
- [Future Features](FUTURE_FEATURES.md)
- [Roadmap](../01_PRODUCT/ROADMAP.md)
- [User Stories](../01_PRODUCT/USER_STORY.md)

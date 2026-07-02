# Mẫu báo cáo bug

> Dùng mẫu này mỗi khi phát hiện lỗi trong code, dữ liệu hoặc nội dung. Tách mỗi bug thành một mục riêng, không gộp nhiều bug vào một báo cáo.

## Cấu trúc 1 báo cáo bug

```
## BUG-YYYYMMDD-NN — Tiêu đề ngắn gọn

- **Mức ưu tiên**: 🔴 Cao / 🟠 Vừa / 🟡 Thấp
- **Loại**: Code / Dữ liệu / Nội dung / Giao diện / Hiệu năng / Khả năng tiếp cận
- **Khu vực**: ví dụ `src/server.js`, `public/js/lesson.js`, `lesson-005`
- **Trình duyệt / thiết bị**: ví dụ Chrome 130 / macOS 14 / iPhone SE 375px
- **Người báo**: Tên
- **Ngày báo**: YYYY-MM-DD

### Mô tả

(2-3 câu, nói rõ vấn đề là gì.)

### Các bước tái hiện

1. Mở `http://localhost:3000/...`
2. Bấm nút "..."
3. Quan sát ...

### Kết quả thực tế

(Cái đang xảy ra. Kèm screenshot nếu là lỗi giao diện. Kèm log console nếu là lỗi code.)

### Kết quả mong đợi

(Cái lẽ ra phải xảy ra.)

### Ảnh chụp / log

(Đính kèm ảnh hoặc dán log ở đây.)

### Test case liên quan

- Ví dụ: TC-LIS-02 fail; TC-DAT-04 phát hiện `answer` không có trong `options`.

### Gợi ý nguyên nhân (nếu biết)

(Để trống nếu chưa có giả thuyết. Không bắt buộc.)

### Trạng thái

- [ ] Mới
- [ ] Đã xác nhận
- [ ] Đang xử lý
- [ ] Đã fix (PR/commit: ...)
- [ ] Đã verify lại
```

## Quy ước mã bug

`BUG-YYYYMMDD-NN`, trong đó `NN` là số thứ tự bug trong ngày, bắt đầu từ `01`. Ví dụ: `BUG-20260626-01`.

## Mức ưu tiên

| Mức | Khi nào dùng | Thời hạn xử lý |
| --- | --- | --- |
| 🔴 Cao | Chặn người học hoàn thành bài; nội dung sai gây hiểu sai tiếng Anh; API/JSON hỏng | Trong 24h |
| 🟠 Vừa | Một kỹ năng bị lỗi nhưng các kỹ năng khác hoạt động; lệch nhẹ giao diện | Trong tuần |
| 🟡 Thấp | Sai chính tả nhỏ, lệch khoảng cách, lỗi hiếm khi tái hiện | Khi có thời gian |

## Ví dụ một bug được điền đầy đủ

```
## BUG-20260626-01 — `answer` không khớp `options` ở lesson-007 listening

- **Mức ưu tiên**: 🔴 Cao
- **Loại**: Dữ liệu
- **Khu vực**: `src/data/lessons.json` → `lesson-007.exercises.listening[0]`
- **Trình duyệt / thiết bị**: Chrome 130 / macOS
- **Người báo**: An
- **Ngày báo**: 2026-06-26

### Mô tả

Trong bài `lesson-007` tab Listening câu 1, chọn phương án đúng nhưng hệ thống vẫn báo sai vì `answer` lưu chữ thường còn `options` viết hoa.

### Các bước tái hiện

1. Mở `http://localhost:3000/lesson.html?id=lesson-007`.
2. Vào tab Listening, bấm Phát.
3. Chọn phương án thứ 2.
4. Quan sát feedback.

### Kết quả thực tế

Hệ thống báo "Sai" dù phương án chọn rõ ràng là đúng nội dung audio.

### Kết quả mong đợi

Hệ thống báo "Đúng" và highlight phương án.

### Test case liên quan

- TC-DAT-04, TC-LIS-02.

### Gợi ý nguyên nhân

`answer` trong JSON là `"9 giờ 30"` còn `options` chứa `"9 Giờ 30"` (chữ G viết hoa). So sánh chuỗi tuyệt đối nên trả về sai.

### Trạng thái

- [x] Mới
- [ ] Đã xác nhận
- [ ] Đang xử lý
- [ ] Đã fix
- [ ] Đã verify
```

## Liên kết

- Kế hoạch test: [TEST_PLAN.md](TEST_PLAN.md)
- Bộ test case: [TEST_CASES.md](TEST_CASES.md)
- Mẫu prompt sửa bug bằng AI: [../06_AI/BUG_FIX_PROMPT.md](../06_AI/BUG_FIX_PROMPT.md)

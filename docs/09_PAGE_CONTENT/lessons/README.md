# Nội dung bài giảng (Lessons) — Kho nguồn

> Đây là nơi lưu **nội dung bài giảng ngữ pháp** đã được làm sạch từ file PDF bạn cung cấp
> (nguồn: ngoaingu24h.vn — cô Vũ Mai Phương). Mỗi Unit = một file `.md`.
> Từ kho này, sau khi thống nhất, sẽ dựng thành trang Bài giảng (`/lessons`).

## Quy trình

1. Bạn gửi file PDF (gửi dần từng đợt).
2. Claude làm sạch (bỏ watermark, quảng cáo, link spam) và chuyển thành `.md` theo **chuẩn bên dưới**.
3. Bạn xem lại nội dung; chỉnh/bổ sung nếu cần.
4. Khi đủ, dựng thành trang web.

## Chuẩn cấu trúc một Unit (.md)

Phần đầu file là **frontmatter** (thông tin tóm tắt) — giúp sắp xếp và dựng trang sau này:

```yaml
---
unit: <số thứ tự>
title_vi: <tên tiếng Việt>
title_en: <tên tiếng Anh>
topic: <chủ đề ngữ pháp>
level: <A0/A1/A2/B1/B2…>
chapter: <số chương theo lộ trình docs 08>
source: ngoaingu24h.vn — cô Vũ Mai Phương
status: draft | reviewed
---
```

Phần thân giữ **đúng theo tài liệu gốc**, dùng heading + bảng markdown:

- Các mục lý thuyết `## A.`, `## B.`, `## C.` … kèm bảng ví dụ.
- `### Quiz …` cho các câu hỏi xen kẽ trong bài.
- `## PRACTICE` cho phần luyện tập cuối bài.

> Liên kết lộ trình tổng: [../../08_LEARNING_ROADMAP/CURRICULUM.md](../../08_LEARNING_ROADMAP/CURRICULUM.md)
> (Mỗi bài giảng trong lộ trình lý tưởng gồm: Explanation, Formula, Usage, Examples,
> Common mistakes, Notes, Quiz, Exercises, Summary, Related lessons — phần nào tài liệu gốc
> chưa có thì để trống/bổ sung sau.)

## Lưu ý quan trọng: tài liệu từ NHIỀU bộ khác nhau

Các file PDF đến từ ít nhất **2 bộ tài liệu** (đều của cô Vũ Mai Phương) với cách đánh số riêng:

- **Bộ "Từ loại"** — đánh "UNIT 1, 2…" → đặt tên file: `unit-XX-…md`
- **Bộ "Ngữ pháp tiếng Anh trọn đời"** — đánh "BÀI 1, 2…" → đặt tên file: `bai-XX-…md`

→ **Số trong tên file PDF (ví dụ "1 9") KHÔNG phải số bài.** Tôi đặt tên `.md` theo **nhan đề thật ghi trong PDF** + tiền tố theo bộ, để không nhầm/đụng nhau. Thông tin bộ ghi trong `series:` ở đầu mỗi file.

## Trạng thái các bài

| Bộ / Bài | File nguồn (PDF) | File .md | Trạng thái |
|----------|------------------|----------|-----------|
| Từ loại — Unit 1: Tìm hiểu chung về các từ loại | `1 1` | [unit-01-tu-loai.md](unit-01-tu-loai.md) | ✅ Nội dung + đáp án |
| Từ loại — Unit 2: Phương pháp học từ loại (1) | `1 2` | [unit-02-phuong-phap-hoc-tu-loai-1.md](unit-02-phuong-phap-hoc-tu-loai-1.md) | ✅ Nội dung + đáp án |
| Trọn đời — Bài 1: Danh từ (1) | `1 9` | [bai-01-danh-tu-1.md](bai-01-danh-tu-1.md) | ✅ Nội dung + bài tập tự tạo |
| Trọn đời — Bài 1: Danh từ (2) | `1 10` | [bai-01-danh-tu-2.md](bai-01-danh-tu-2.md) | ✅ Nội dung + đáp án + bài tập tự tạo |
| Trọn đời — Tính từ (1) | `1 14` | [tinh-tu-1.md](tinh-tu-1.md) | ✅ Nội dung + đáp án |
| Trọn đời — Tính từ (2): Tính từ + giới từ | `1 15` | [tinh-tu-2.md](tinh-tu-2.md) | ✅ Nội dung + đáp án |
| Trọn đời — Tính từ (3): đơn/ghép, hậu–tiền tố, thứ tự | `1 16` | [tinh-tu-3.md](tinh-tu-3.md) | ✅ Nội dung + đáp án |
| Trọn đời — Tính từ (1) — Luyện tập (bài tập) | `1 14 ĐỀ` | [tinh-tu-luyen-tap-1.md](tinh-tu-luyen-tap-1.md) | ✅ Bài tập + đáp án |
| Trọn đời — Trạng từ (1): lý thuyết | `1 20` | [trang-tu-1.md](trang-tu-1.md) | ✅ Nội dung + đáp án |
| Trọn đời — Trạng từ (2): bài tập | `1 21` | [trang-tu-2-bai-tap.md](trang-tu-2-bai-tap.md) | ✅ Bài tập + đáp án |
| _(đề kiểm tra)_ | `1 12 ĐỀ` | — | ❌ Không còn trong thư mục Downloads |

> Đã xong **6/7 file** của đợt đầu. File `1 12 ĐỀ` không còn trong `~/Downloads` (có thể đã đổi tên/di chuyển) — nếu cần, bạn gửi lại.
>
> **Ghi chú:** thư mục Downloads hiện có RẤT nhiều file khác (cả khóa học: chương 1–8, kèm các file `… BT` = bài tập, `… ĐỀ` = đề kiểm tra). Tôi **chưa xử lý** các file này — chờ bạn cung cấp/chỉ định theo từng đợt.

## Quy tắc bài tập & chấm điểm (đã chốt)

Áp dụng cho **mọi Unit** và phần dựng trang web sau này:

1. **Đáp án:** mỗi câu Quiz/Practice đều có đáp án + **giải thích ngắn gọn** (vì sao đúng), lưu ở mục `## Đáp án & giải thích` cuối mỗi Unit. _(File gốc không có đáp án → Claude tự giải; bạn nên rà lại.)_
2. **Tự tạo bài tập khi thiếu:** phần nào bạn **chưa có bài tập**, Claude **tự tạo thêm** dựa trên đúng kiểu/độ khó của các bài bạn đã upload. Bài tự tạo được đánh dấu `*(Claude tạo)*` để dễ phân biệt.
3. **Chấm điểm trễ (deferred grading):** trên web, người học **làm hết** rồi mới bấm **Submit** → lúc đó mới chấm. **Không** hiện đúng/sai ngay khi chọn.
4. **Kết quả kèm giải thích:** sau khi Submit, hiện điểm + đánh dấu đúng/sai từng câu + **giải thích ngắn** cho mỗi câu.
5. **Ví dụ:** giữ câu ví dụ **như tài liệu gốc** (chỉ dịch nghĩa của từ, không dịch cả câu).

> Quy tắc 3–4 khác với "phản hồi tức thì" trong `../../03_DESIGN/UX_PRINCIPLE.md`; quy tắc ở đây là bản chính thức cho phần làm bài, sẽ đồng bộ lại doc thiết kế khi dựng giao diện.

## Thương hiệu (ghi nhận từ trang chủ)

Tên hiển thị mong muốn: **"Học cùng Sophie (phiên dịch tiếng Anh)"**, logo hình **Phượng hoàng tái sinh** (xem [../00_HOME.md](../00_HOME.md)). Áp dụng đồng bộ toàn site khi dựng giao diện.

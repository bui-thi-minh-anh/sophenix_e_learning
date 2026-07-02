# Kiến trúc

## Stack đã chọn (giai đoạn đầu)

Ưu tiên đơn giản, chạy được ngay, không cần cài cơ sở dữ liệu.

| Phần | Công nghệ | Vai trò |
|------|-----------|---------|
| Máy chủ (backend) | Node.js + Express | Phục vụ trang web và API bài giảng |
| Giao diện (frontend) | HTML + CSS + JavaScript thuần | Hiển thị bài giảng và bài tập |
| Dữ liệu | File JSON (`src/data/lessons.json`) | Lưu nội dung bài giảng |
| Nghe | Web Speech API (đọc văn bản) | Không cần file âm thanh |
| Nói | Web Speech API (nhận diện giọng nói) | Hoạt động tốt trên Chrome |

> Khi dữ liệu lớn dần, có thể chuyển từ file JSON sang cơ sở dữ liệu (SQLite/PostgreSQL).

## Luồng hoạt động

```
Trình duyệt  →  public/*.html + js  →  gọi API  →  Express (src/server.js)  →  đọc lessons.json
```

- `GET /api/lessons` → danh sách bài giảng (tóm tắt)
- `GET /api/lessons/:id` → chi tiết một bài giảng (nội dung + bài tập)

## Mô hình dữ liệu (một bài giảng)

```
Lesson
├── id, title, level, topic, description
├── lecture: { intro, grammar, vocabulary[] }
│       vocabulary: { word, phonetic, meaning_vi, example_en, example_vi }
└── exercises:
    ├── listening[]: { audioText, question, options[], answer }
    ├── speaking[]:  { prompt_vi, modelAnswer_en }
    ├── reading[]:   { passage, question, options[], answer }
    └── writing[]:   { prompt_vi, minWords, sampleAnswer_en }
```

## Cần làm tiếp (xem roadmap.md)

- [ ] Tài khoản người dùng & đăng nhập
- [ ] Lưu tiến độ và điểm số
- [ ] Chuyển dữ liệu sang cơ sở dữ liệu khi cần

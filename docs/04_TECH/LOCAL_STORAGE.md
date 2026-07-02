# Lưu trữ phía client — localStorage (ĐỊNH HƯỚNG TƯƠNG LAI)

> Đề xuất sơ đồ lưu tiến độ học, điểm số và từ vựng yêu thích bằng `localStorage`. **Đây là định hướng tương lai** — hiện dự án CHƯA lưu trạng thái phía client (giai đoạn đầu chưa có backend lưu trạng thái).

## 1. Vì sao dùng localStorage trước

- Không cần backend, không cần đăng nhập → triển khai nhanh ở giai đoạn đầu.
- Dữ liệu giữ lại giữa các lần mở trang trên cùng trình duyệt/thiết bị.
- Khi có backend + tài khoản (tương lai), có thể đồng bộ dữ liệu localStorage lên server.

Hạn chế cần biết: dữ liệu chỉ nằm trên 1 trình duyệt/thiết bị, mất khi người dùng xóa dữ liệu duyệt web, dung lượng ~5MB.

## 2. Quy ước key

Dùng tiền tố `le.` (Sophenix) để tránh đụng độ:

| Key | Nội dung |
| --- | --- |
| `le.progress` | Tiến độ & điểm theo từng bài |
| `le.favorites` | Danh sách từ vựng yêu thích |
| `le.settings` | Tùy chọn người dùng (vd: tốc độ đọc) |

## 3. Cấu trúc JSON đề xuất

### `le.progress`

```json
{
  "lesson-001": {
    "completed": true,
    "lastVisited": "2026-06-26T10:00:00.000Z",
    "scores": {
      "listening": { "correct": 2, "total": 2 },
      "reading":   { "correct": 1, "total": 1 },
      "speaking":  { "attempted": 2, "matched": 1 },
      "writing":   { "submitted": 1 }
    }
  },
  "lesson-002": {
    "completed": false,
    "lastVisited": "2026-06-25T08:30:00.000Z",
    "scores": { "listening": { "correct": 0, "total": 1 } }
  }
}
```

### `le.favorites`

Lưu theo từ + bài để tránh trùng:

```json
[
  { "word": "hello",     "lessonId": "lesson-001", "meaning_vi": "xin chào", "addedAt": "2026-06-26T10:01:00.000Z" },
  { "word": "breakfast", "lessonId": "lesson-002", "meaning_vi": "bữa sáng", "addedAt": "2026-06-26T10:05:00.000Z" }
]
```

### `le.settings`

```json
{ "speechRate": 0.9, "showPhonetic": true }
```

## 4. Ví dụ code (đề xuất, JS thuần — khớp style dự án)

```js
// Tiện ích đọc/ghi localStorage an toàn (dùng const/let, tên hàm tiếng Anh)
const Storage = {
  read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      // Dữ liệu hỏng -> trả giá trị mặc định
      return fallback;
    }
  },
  write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

// Lưu điểm trắc nghiệm cho một kỹ năng của một bài
function saveScore(lessonId, skill, correct, total) {
  const progress = Storage.read('le.progress', {});
  const lesson = progress[lessonId] || { completed: false, scores: {} };
  lesson.scores[skill] = { correct, total };
  lesson.lastVisited = new Date().toISOString();
  progress[lessonId] = lesson;
  Storage.write('le.progress', progress);
}

// Thêm/bỏ từ vựng yêu thích
function toggleFavorite(word, lessonId, meaning_vi) {
  const favorites = Storage.read('le.favorites', []);
  const index = favorites.findIndex(
    (f) => f.word === word && f.lessonId === lessonId
  );
  if (index >= 0) {
    favorites.splice(index, 1); // bỏ yêu thích
  } else {
    favorites.push({ word, lessonId, meaning_vi, addedAt: new Date().toISOString() });
  }
  Storage.write('le.favorites', favorites);
  return index < 0; // true nếu vừa thêm
}
```

## 5. Gợi ý điểm tích hợp (khi triển khai)

| Sự kiện trong UI hiện tại | Hành động lưu đề xuất |
| --- | --- |
| Chọn đúng/sai trắc nghiệm (`.option` trong `lesson.js`) | Cộng dồn `scores.listening`/`scores.reading` |
| Nói thử khớp mẫu (`data-record`) | Cập nhật `scores.speaking` |
| Nộp bài viết (`data-check-writing`) | Cập nhật `scores.writing` |
| Bấm 🔊 trên từ vựng | Thêm nút "yêu thích" cạnh đó → `toggleFavorite` |
| Mở trang chi tiết bài | Ghi `lastVisited` |

## 6. Khi nào chuyển sang backend

Khi cần: đồng bộ đa thiết bị, bảng xếp hạng, tài khoản học viên. Lúc đó lưu tiến độ trong DB (xem định hướng ở [TECH_ARCHITECTURE.md](TECH_ARCHITECTURE.md)) và dùng localStorage làm cache.

## Liên kết liên quan

- Quản lý state frontend: [STATE_MANAGEMENT.md](STATE_MANAGEMENT.md)
- Kiến trúc: [TECH_ARCHITECTURE.md](TECH_ARCHITECTURE.md)

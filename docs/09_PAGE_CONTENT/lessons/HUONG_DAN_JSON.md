# Định dạng JSON cho một bài giảng

> Gửi bài giảng dạng JSON theo đúng cấu trúc dưới đây → Claude lưu thành file `.json` và bài lên web ngay (không cần làm sạch/parse).

## Cấu trúc các trường

| Trường | Bắt buộc | Ý nghĩa |
|--------|----------|---------|
| `slug` | ✅ | Mã không dấu, dùng cho đường dẫn (vd `danh-tu-3`). Không trùng bài khác. |
| `title` | ✅ | Tên bài (vd `Danh từ (3)`). |
| `level` | ✅ | Một trong: `A0` `A1` `A2` `B1` `B2` `C1` `C2`. |
| `topic` | ✅ | Chủ đề ngữ pháp (vd `Danh từ (Noun)`). |
| `series` | — | Bộ tài liệu nguồn. |
| `summary` | — | Mô tả ngắn hiện ở thẻ danh sách. |
| `sections` | ✅ | Mảng phần lý thuyết: mỗi phần có `heading` và `body`. `body` viết **markdown** (hỗ trợ bảng, danh sách, **in đậm**). |
| `exerciseSets` | ✅ | Mảng các **bộ bài tập** (Bài tập 1, 2, 3…). Mỗi bộ mở/nộp/chấm riêng. |

Trong mỗi **exerciseSet**: `id`, `title`, `description` (tùy chọn), và `exercises`.
Trong mỗi **exercise**: `id`, `question`, `options` (mảng `{key, text}`), `answer` (key đúng), `explanation` (tùy chọn).

## Quy tắc viết JSON

- Dùng **dấu ngoặc kép** `"` cho mọi chuỗi.
- **Không** để dấu phẩy thừa ở cuối mảng/đối tượng.
- Nếu trong chữ có dấu `"` thì viết `\"`; xuống dòng trong `body` viết `\n`.
- `answer` phải trùng một `key` trong `options`.

## Ví dụ đầy đủ (copy rồi sửa)

```json
{
  "slug": "danh-tu-3",
  "title": "Danh từ (3)",
  "level": "A0",
  "topic": "Danh từ (Noun)",
  "series": "Ngữ pháp tiếng Anh trọn đời — cô Vũ Mai Phương",
  "summary": "Sở hữu cách và một số lưu ý về danh từ.",
  "sections": [
    {
      "heading": "I. Sở hữu cách",
      "body": "- Với người/động vật: **'s** → Tom's book.\n- Với vật: **of** → the door of the room.\n\n| Số | Cách thêm |\n|----|-----------|\n| Số ít | + 's |\n| Số nhiều có s | + ' |"
    }
  ],
  "exerciseSets": [
    {
      "id": "bt1",
      "title": "Bài tập 1",
      "description": "Chọn đáp án đúng",
      "exercises": [
        {
          "id": "q1",
          "question": "This is ______ book.",
          "options": [
            { "key": "A", "text": "Tom" },
            { "key": "B", "text": "Tom's" },
            { "key": "C", "text": "Toms" },
            { "key": "D", "text": "of Tom" }
          ],
          "answer": "B",
          "explanation": "Sở hữu cách với người → 's."
        }
      ]
    }
  ]
}
```

> Bạn có thể để **nhiều `sections`** và **nhiều `exerciseSets`** (Bài tập 1, 2, 3…) tùy ý.
> Nếu chưa có đáp án/giải thích, cứ để trống phần đó — Claude sẽ tự bổ sung.

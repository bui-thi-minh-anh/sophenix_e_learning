# Kiến trúc nội dung & tài nguyên (Content Architecture)

> Thiết kế thư mục cho Sophenix ở quy mô **10.000+ bài học, 50.000+ file audio,
> 20+ module**. Mục tiêu: tách bạch nội dung/asset, mỗi module tự do cấu trúc,
> dễ điều hướng, dễ mở rộng, thân thiện Next.js.

## Nguyên tắc cốt lõi

1. **Tách hoàn toàn nội dung và asset nhị phân.**
   - `docs/` = văn bản (Markdown, JSON) → commit vào git.
   - `public/` = nhị phân (mp3, wav, ảnh) → Next.js serve; audio sinh bằng TTS thì **gitignore**.
   - **Không bao giờ trộn lẫn.** (Lý do: git phình vì binary, và Next chỉ serve file trong `public/`.)

2. **Mỗi module có cấu trúc riêng.** Listening (hướng *bài học*) khác Speaking
   (hướng *phát âm*). Không ép chung một cây thư mục.

3. **Quy ước "slug" gương 1:1.** Với 1 bài, dùng cùng một slug có nghĩa cho cả
   3 nơi — đây là bất biến quan trọng nhất:
   ```
   docs/.../<slug>.md   ↔   public/audio/.../<slug>.mp3   ↔   public/images/.../<slug>.png
   ```
   Nhờ vậy: sinh audio, tra cứu, dọn dẹp đều suy ra được đường dẫn, **không cần database**.

4. **Mỗi module đều có bộ ba** `docs/`, `public/audio/`, `public/images/` với path song song.

---

## 1. Cây thư mục hoàn chỉnh

### Gốc nội dung

Nội dung nằm dưới **content root** `docs/09_PAGE_CONTENT/` (khu vực "page content"
đã có). Mỗi module = 1 thư mục con. *(Đây chính là dạng đầy đủ của lối viết tắt
`docs/listening/` — đặt trong content root để không trộn với thư mục tài liệu dự
án `00_…09_`.)*

```
docs/09_PAGE_CONTENT/
├── listening/                       # MODULE: hướng bài học (lesson-oriented)
│   ├── README.md                    # index + quy ước của module
│   ├── education/                   # topic (kebab-case)
│   │   ├── README.md                # metadata topic (frontmatter)
│   │   ├── school-orientation.md    # 1 bài = 1 file, TÊN CÓ NGHĨA
│   │   └── first-day-at-school.md
│   ├── travel/
│   │   ├── README.md
│   │   └── booking-a-room-by-phone.md
│   └── ...                          # accommodation, health, technology, ...
│
├── speaking/                        # MODULE: hướng phát âm (pronunciation-oriented)
│   ├── README.md
│   ├── ipa/                         # theo phân cấp phát âm, KHÔNG theo topic
│   │   ├── i-long.md                # /iː/
│   │   └── short-i.md               # /ɪ/
│   ├── words/
│   │   ├── vowels/
│   │   └── consonants/
│   ├── minimal-pairs/
│   │   ├── ship-sheep.md
│   │   └── live-leave.md
│   ├── sentences/
│   │   ├── vowels/
│   │   └── consonants/
│   ├── paragraphs/
│   ├── shadowing/
│   └── roleplay/
│
├── reading/        # (mở rộng) hướng bài đọc theo topic — giống Listening
├── writing/        # (mở rộng)
├── grammar/        # (mở rộng) theo chủ điểm ngữ pháp
└── vocabulary/     # (mở rộng) theo bộ từ / topic
```

### Gốc asset (mirror y hệt cây nội dung)

```
public/
├── audio/                           # (gitignore *.mp3/*.wav — sinh bằng TTS)
│   ├── listening/
│   │   ├── education/
│   │   │   ├── school-orientation.mp3
│   │   │   └── first-day-at-school.mp3
│   │   └── travel/
│   │       └── booking-a-room-by-phone.mp3
│   └── speaking/                    # tổ chức theo phân cấp phát âm
│       ├── ipa/
│       │   ├── i-long.mp3
│       │   └── short-i.mp3
│       ├── words/{vowels,consonants}/
│       ├── minimal-pairs/{ship-sheep,live-leave}/
│       ├── sentences/{vowels,consonants}/
│       ├── paragraphs/
│       ├── shadowing/
│       └── roleplay/
│
└── images/                          # ảnh minh hoạ (thường COMMIT — curate tay)
    ├── listening/
    │   ├── education/
    │   └── travel/
    └── speaking/
        └── ipa/
```

### Code (Next.js) — mỗi module 1 loader riêng

```
src/
├── lib/
│   ├── listening.ts          # loader đọc docs/.../listening (fs + gray-matter)
│   ├── speaking.ts           # loader riêng (schema khác Listening)
│   └── listening-progress.ts # tiến độ (localStorage)
├── components/
│   ├── listening/            # audio-player, listening-lesson, listening-exercise, ...
│   └── speaking/
└── app/
    ├── listening/            # /listening, /listening/[topic], /listening/[topic]/[lesson]
    └── speaking/             # route theo phân cấp phát âm
```

---

## 2. Vì sao mỗi thư mục tồn tại

| Thư mục | Vai trò |
|---|---|
| `docs/09_PAGE_CONTENT/<module>/` | Nguồn sự thật (text) cho 1 module. Tách theo module vì mỗi module có schema & phân cấp khác nhau. |
| `<module>/<topic>/` (Listening) | Gom bài theo chủ đề — đơn vị điều hướng của người học & đơn vị "shard" khi số bài lớn. |
| `<module>/README.md` | Index + quy ước riêng của module (cho người viết nội dung & cho AI). |
| `<topic>/README.md` | Metadata topic ở **frontmatter** (tên, mô tả, icon, thứ tự) → UI đọc, không hardcode. |
| `speaking/ipa|words|minimal-pairs|...` | Speaking đi theo **luồng phát âm** (IPA→âm→từ→cặp tối thiểu→câu→đoạn→shadowing→role play), không theo topic → cây thư mục phản ánh đúng luồng học. |
| `public/audio/<module>/...` | Asset audio, **mirror** cây docs qua slug. Gitignore vì sinh tự động, tái tạo được. |
| `public/images/<module>/...` | Ảnh minh hoạ, mirror cây docs. Commit vì thường ít và curate tay. |
| `src/lib/<module>.ts` | Loader riêng mỗi module (không ép chung schema). Chỉ **chia sẻ các key frontmatter chuẩn**. |

---

## 3. Quy ước đặt tên

- **Thư mục & file:** `kebab-case`, không dấu, không khoảng trắng.
- **Tên module:** danh từ số ít, viết thường: `listening`, `speaking`, `reading`…
- **Tên bài = slug có nghĩa** (KHÔNG `lesson-001`): `booking-a-room-by-phone.md`,
  `first-day-at-school.md`, `ship-sheep.md`.
- **Bất biến slug 1:1:** `<slug>.md` ⇔ `<slug>.mp3` ⇔ `<slug>.png` tại path song song.
  → nhìn tên file ở bất kỳ đâu là biết ngay 2 file còn lại nằm đâu.
- **`id` frontmatter (duy nhất toàn hệ thống):** `<module>-<topic>-<slug>`,
  vd `travel-booking-a-room-by-phone`. Dùng cho tiến độ, phân tích, liên kết chéo.
- **`README.md`** viết hoa (quy ước GitHub); mọi file bài dùng chữ thường.

### Front matter chuẩn (mọi module đều có)

```yaml
---
id:        travel-booking-a-room-by-phone   # duy nhất
title:     Booking a Room by Phone           # tiêu đề chính (EN)
level:     B1                                # A1|A2|B1|B2|C1
topic:     Travel
duration:  41                                # giây
tags:      [travel, hotel, booking, IELTS]
audio:     /audio/listening/travel/booking-a-room-by-phone.mp3
image:     /images/listening/travel/booking-a-room-by-phone.png
---
```

Module tự thêm key riêng **sau** khối chuẩn, ví dụ Listening: `speakers`,
`vocabulary`, `fill_blanks`, `mcq`, `grammar_focus`; Speaking: `ipa`, `phoneme`,
`minimal_pair`, `shadowing_ref`…

---

## 4. Best practices bảo trì lâu dài

1. **Giữ bất biến slug 1:1.** Đổi tên bài = đổi cả `.md`/`.mp3`/`.png` + cập nhật
   `audio`/`image` trong frontmatter. Có thể viết script kiểm tra "orphan"
   (audio không có md, hoặc md trỏ tới audio không tồn tại).
2. **Audio là sản phẩm phái sinh.** Luôn sinh từ transcript bằng
   `scripts/tts/gen_audio.py`; an toàn để xoá & tạo lại. Vì vậy gitignore, không commit.
3. **Shard theo topic/sub-topic để tránh thư mục quá lớn.** Mục tiêu **< ~1.000
   file/thư mục**. Nếu 1 topic phình to → tách sub-topic (`travel/airport/…`).
   Với 10.000 bài, cây lồng nhau vẫn duyệt tốt.
4. **Mỗi module 1 loader riêng**, chỉ chia sẻ key frontmatter chuẩn. Không ép
   Speaking vào schema của Listening.
5. **Không hardcode danh sách bài.** UI luôn quét thư mục (build-time, server
   component). Thêm/xoá file `.md` → giao diện tự cập nhật.
6. **SSG:** dùng `generateStaticParams()` sinh trước route từ loader → tối ưu cho
   quy mô lớn; đọc `fs` chỉ xảy ra lúc build.
7. **README.md ở mỗi cấp** vừa là index cho người, vừa chứa frontmatter metadata
   cho máy.
8. **Thêm module mới = lặp lại bộ ba:** tạo `docs/09_PAGE_CONTENT/<module>/`,
   `public/audio/<module>/`, `public/images/<module>/`, và `src/lib/<module>.ts`.
   Không đụng vào module cũ ⇒ mở rộng không phá vỡ.
9. **Chuẩn hoá trước khi sinh audio:** số → chữ (“123” → “one hundred…”), để
   TTS đọc đúng. Attribute giọng chỉ dùng giá trị hợp lệ của OmniVoice
   (`young adult`, không phải `adult`).

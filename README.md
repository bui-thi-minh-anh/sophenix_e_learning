# Sophenix — Website học tiếng Anh

Website học tiếng Anh song ngữ Anh–Việt (Next.js 14 + TypeScript + Tailwind + shadcn/ui).
Chi tiết kiến trúc cho lập trình viên/AI xem [CLAUDE.md](CLAUDE.md).

## Yêu cầu

- **Node.js ≥ 18** (khuyến nghị 20+) và **npm** — kiểm tra: `node -v`, `npm -v`
- (Tùy chọn, chỉ khi sinh audio TTS) Python 3.11 + ffmpeg — xem [scripts/tts/README.md](scripts/tts/README.md)

## Chạy web

```bash
npm install        # cài dependencies (chỉ lần đầu, hoặc sau khi pull có đổi package)
npm run dev        # chạy chế độ dev → http://localhost:3000
```

Các lệnh khác:

```bash
npm run build      # build production (đồng thời kiểm tra type + lint)
npm start          # chạy bản đã build (chạy `npm run build` trước)
npm run lint       # kiểm tra ESLint
```

> **Cổng 3000 bị chiếm?** Next sẽ tự nhảy sang 3001 (dễ nhầm "không chạy được").
> Xem tiến trình đang giữ cổng rồi tắt:
> ```bash
> lsof -nP -iTCP:3000 -sTCP:LISTEN   # xem PID
> kill <PID>
> ```

---

## Làm việc với Git

Repo: `git@github-personal:bui-thi-minh-anh/sophenix_e_learning.git` · nhánh chính: **main**

> ⚠️ Remote dùng **SSH alias `github-personal`** (cấu hình trong `~/.ssh/config`).
> Nếu `git push/pull` báo lỗi quyền, kiểm tra alias này. Xem alias hiện có:
> `cat ~/.ssh/config`

### Lấy code mới nhất (pull)

```bash
git pull origin main
```

Nếu đang có thay đổi chưa commit mà muốn pull, tạm cất đi rồi lấy lại:

```bash
git stash            # cất thay đổi tạm
git pull origin main
git stash pop        # lấy lại thay đổi
```

### Đưa code lên (push)

```bash
git status                       # xem file đã đổi
git add .                        # đưa tất cả thay đổi vào staging
git commit -m "Nội dung thay đổi" # ghi lại commit
git pull origin main             # nên pull trước khi push để tránh xung đột
git push origin main
```

### Làm việc trên nhánh riêng (khuyến nghị cho tính năng lớn)

```bash
git checkout -b ten-tinh-nang    # tạo & chuyển sang nhánh mới
# ... code ...
git add .
git commit -m "Thêm tính năng X"
git push origin ten-tinh-nang    # đẩy nhánh lên, rồi mở Pull Request trên GitHub
```

### Lệnh git hay dùng

```bash
git log --oneline -10            # xem 10 commit gần nhất
git diff                         # xem thay đổi chưa staged
git checkout -- <file>           # bỏ thay đổi 1 file (chưa commit)
git branch                       # xem các nhánh
```

---

## Lưu ý nội dung

- File **audio** (`public/audio/**`) đã được `.gitignore` (sinh bằng TTS, không commit).
  Người khác pull về sẽ **không** có audio — cần sinh lại (xem `scripts/tts/README.md`)
  hoặc lấy file audio qua kênh khác.
- Nội dung bài học ở dạng **text** trong `docs/09_PAGE_CONTENT/` và `src/content/` —
  commit bình thường. Kiến trúc nội dung: [docs/04_TECH/CONTENT_ARCHITECTURE.md](docs/04_TECH/CONTENT_ARCHITECTURE.md).

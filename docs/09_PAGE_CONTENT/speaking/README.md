# Speaking — Nguồn dữ liệu (hướng phát âm)

Speaking **khác** Listening: tổ chức theo **luồng phát âm**, không theo topic.

```
IPA → Single Sound → Word → Word Pair (minimal pairs) → Sentence → Paragraph → Shadowing → Role Play
```

## Cấu trúc

```
speaking/
├── ipa/                 # từng âm IPA: i-long.md (/iː/), short-i.md (/ɪ/)
├── words/{vowels,consonants}/
├── minimal-pairs/       # ship-sheep.md, live-leave.md
├── sentences/{vowels,consonants}/
├── paragraphs/
├── shadowing/
└── roleplay/
```

Audio mirror tại `public/audio/speaking/...`, ảnh tại `public/images/speaking/...`
theo **bất biến slug 1:1** (xem `docs/04_TECH/CONTENT_ARCHITECTURE.md`).

Loader riêng: `src/lib/speaking.ts` (schema khác Listening). Xem file mẫu
`ipa/i-long.md`.

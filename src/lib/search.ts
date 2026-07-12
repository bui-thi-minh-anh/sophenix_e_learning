// Chuẩn hoá text để tìm kiếm: bỏ dấu tiếng Việt, đ→d, về chữ thường.
export function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .trim();
}

// true nếu query khớp BẤT KỲ trường nào (không phân biệt dấu, hoa/thường).
// Nhờ chuẩn hoá, tìm được cả tên tiếng Anh lẫn tiếng Việt trong cùng một chuỗi.
export function matchesQuery(query: string, ...fields: (string | undefined | null)[]): boolean {
  const q = normalize(query);
  if (!q) return true;
  return fields.some((f) => f != null && normalize(f).includes(q));
}

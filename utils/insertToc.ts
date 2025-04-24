export function insertTocToContent(content: string, toc: string): string {
  if (!toc) return content;

  const tocWithTitle = `
      <div class="toc mb-6">
        <strong class="block text-base font-semibold text-gray-800 mb-2">📚 Mục Lục Bài Viết</strong>
        ${toc}
      </div>
    `;

  // Chèn TOC vào trước thẻ heading đầu tiên (h1-h6)
  const headingRegex = /<(h[1-6])[^>]*>/i;
  const match = content.match(headingRegex);

  if (match) {
    const index = content.indexOf(match[0]);
    return content.slice(0, index) + tocWithTitle + content.slice(index);
  }

  // Nếu không có heading thì thêm TOC đầu bài
  return tocWithTitle + content;
}
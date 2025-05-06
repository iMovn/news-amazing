export function insertTocToContent(content: string, toc: string): string {
  if (!toc) return content;

  // Chèn TOC vào trước thẻ heading đầu tiên (h1-h6)
  const headingRegex = /<(h[1-6])[^>]*>/i;
  const match = content.match(headingRegex);

  if (!match) return content; // Không có heading thì không chèn TOC

  const tocWithTitle = `
      <div class="toc mb-4 mt-4">
        <strong class="block text-base font-semibold text-gray-800 mb-2">Mục Lục Bài Viết</strong>
        ${toc}
      </div>
    `;

  const index = content.indexOf(match[0]);
  return content.slice(0, index) + tocWithTitle + content.slice(index);
}

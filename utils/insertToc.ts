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
// /**
//  * Chèn table of contents (TOC) vào nội dung bài viết
//  * @param content Nội dung HTML của bài viết
//  * @param toc Table of contents HTML string
//  * @returns Nội dung đã được chèn TOC
//  */
// export function insertTocToContent(content: string, toc: string): string {
//   if (!content || !toc || toc === '<ul class="toc"></ul>') {
//     return content;
//   }

//   try {
//     // Tìm thẻ h2 đầu tiên để chèn TOC trước nó
//     const firstH2Index = content.indexOf("<h2");

//     // Nếu không tìm thấy thẻ h2, thử tìm thẻ h3
//     if (firstH2Index === -1) {
//       const firstH3Index = content.indexOf("<h3");

//       if (firstH3Index === -1) {
//         // Nếu không tìm thấy cả h2 và h3, chèn TOC vào đầu nội dung
//         return `<div class="table-of-contents mb-6">${toc}</div>${content}`;
//       }

//       // Chèn TOC trước thẻ h3 đầu tiên
//       return `${content.substring(
//         0,
//         firstH3Index
//       )}<div class="table-of-contents mb-6">${toc}</div>${content.substring(
//         firstH3Index
//       )}`;
//     }

//     // Chèn TOC trước thẻ h2 đầu tiên
//     return `${content.substring(
//       0,
//       firstH2Index
//     )}<div class="table-of-contents mb-6">${toc}</div>${content.substring(
//       firstH2Index
//     )}`;
//   } catch (error) {
//     console.error("Error inserting TOC:", error);
//     return content;
//   }
// }

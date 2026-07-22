import { access } from 'node:fs/promises';

const screenshots = [
  'docs/public/components/table-toolbar-default.png',
  'docs/public/components/table-pagination-default.png',
  'docs/public/components/table-pagination-custom-footer.png',
];

await Promise.all(screenshots.map((path) => access(path)));
console.log(`Verified ${screenshots.length} versioned component screenshots.`);

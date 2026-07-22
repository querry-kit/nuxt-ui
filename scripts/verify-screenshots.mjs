import { access } from 'node:fs/promises';

const screenshots = [
  'docs/public/components/table-toolbar-default.png',
  'docs/public/components/table-sorting-popover.png',
  'docs/public/components/table-sorting-configured-popover.png',
  'docs/public/components/table-filtering-popover.png',
  'docs/public/components/table-filtering-configured-popover.png',
  'docs/public/components/table-options-popover.png',
  'docs/public/components/table-options-pin-popover.png',
  'docs/public/components/table-pagination-default.png',
  'docs/public/components/table-pagination-custom-footer.png',
];

await Promise.all(screenshots.map((path) => access(path)));
console.log(`Verified ${screenshots.length} versioned component screenshots.`);

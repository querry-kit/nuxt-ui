import { access } from 'node:fs/promises';

const screenshots = [
  'test/screenshots/components/table-toolbar-default.png',
  'test/screenshots/components/table-toolbar-custom-icons.png',
  'test/screenshots/components/table-sorting-popover.png',
  'test/screenshots/components/table-sorting-configured-popover.png',
  'test/screenshots/components/table-filtering-popover.png',
  'test/screenshots/components/table-filtering-configured-popover.png',
  'test/screenshots/components/table-options-popover.png',
  'test/screenshots/components/table-options-pin-popover.png',
  'test/screenshots/components/table-pagination-default.png',
  'test/screenshots/components/table-pagination-custom-footer.png',
];

await Promise.all(screenshots.map((path) => access(path)));
console.log(`Verified ${screenshots.length} versioned component screenshots.`);

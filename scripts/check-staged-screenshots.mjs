import { execFileSync } from 'node:child_process';

const visualPaths = [
  /^\.storybook\//,
  /^docs\/public\/components\//,
  /^playwright\.config\.ts$/,
  /^src\/runtime\//,
  /^stories\//,
  /^test\/screenshots\.spec\.ts$/,
];

const stagedFiles = execFileSync('git', ['diff', '--cached', '--name-only', '--diff-filter=ACMRD'], {
  encoding: 'utf8',
})
  .trim()
  .split('\n')
  .filter(Boolean);

if (!stagedFiles.some((file) => visualPaths.some((pattern) => pattern.test(file)))) {
  console.log('No staged visual changes; skipping screenshot check.');
  process.exit(0);
}

console.log('Staged visual changes detected; comparing local screenshot baselines.');
execFileSync('pnpm', ['screenshots:check'], { stdio: 'inherit' });

import { defaultTableIcons, type TableIconKey, type TableIconOverrides } from '../icons';

const getIcon = (icons: TableIconOverrides | typeof defaultTableIcons, key: TableIconKey) =>
  key.split('.').reduce<unknown>((value, segment) => {
    if (!value || typeof value !== 'object') return undefined;
    return (value as Record<string, unknown>)[segment];
  }, icons);

/** Resolves an explicit nested icon override with the package default as fallback. */
export function useTableIcons(icons?: TableIconOverrides) {
  return (key: TableIconKey) => {
    const override = icons && getIcon(icons, key);
    return typeof override === 'string' ? override : (getIcon(defaultTableIcons, key) as string);
  };
}

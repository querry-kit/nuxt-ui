export function canHandleTableShortcut(event) {
  if (event.defaultPrevented) return false;
  const target = event.target;
  if (!(target instanceof HTMLElement)) return true;
  return !target.isContentEditable && !["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

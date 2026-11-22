import { onBeforeUnmount, onMounted } from "vue";
import { canHandleTableShortcut } from "../utils/keyboard.js";
export function useTableShortcut(key, enabled, activate) {
  const handle = (event) => {
    if (!enabled() || !event.shiftKey || event.ctrlKey || event.metaKey || event.altKey || event.repeat || event.isComposing)
      return;
    if (!canHandleTableShortcut(event) || event.target instanceof Element && event.target.closest('[aria-modal="true"]'))
      return;
    const pressed = event.key.toLowerCase();
    if (pressed !== key && !(key === "/" && pressed === "?")) return;
    if (activate() !== false) event.preventDefault();
  };
  onMounted(() => document.addEventListener("keydown", handle));
  onBeforeUnmount(() => document.removeEventListener("keydown", handle));
}

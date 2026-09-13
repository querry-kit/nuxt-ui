import { useAppConfig } from "#app";
import { defaultTableIcons } from "../icons.js";
const getIcon = (icons, key) => key.split(".").reduce((value, segment) => {
  if (!value || typeof value !== "object") return void 0;
  return value[segment];
}, icons);
export function useTableIcons(icons) {
  const appIcons = useAppConfig().querryKit?.table?.icons;
  return (key) => {
    const componentIcon = icons && getIcon(icons, key);
    if (typeof componentIcon === "string") return componentIcon;
    const appIcon = appIcons && getIcon(appIcons, key);
    return typeof appIcon === "string" ? appIcon : getIcon(defaultTableIcons, key);
  };
}

export const defaultTableTexts = {
  search: { placeholder: "Search" },
  sorting: {
    title: "Sort",
    field: "Select field",
    add: "Add sort",
    clear: "Clear sorting",
    remove: "Remove sort",
    toggle: "Toggle sort direction"
  },
  filtering: {
    title: "Filter",
    field: "Select field",
    add: "Add filter",
    clear: "Clear filters",
    remove: "Remove filter",
    mode: "Toggle filter mode"
  },
  options: {
    title: "Table options",
    pin: "Pin column",
    left: "Left",
    right: "Right",
    center: "Unpin",
    visibility: "Toggle column visibility"
  },
  pagination: { summary: "Showing {start}\u2013{end} of {total}" }
};
export default {
  "@querry-kit": { table: defaultTableTexts }
};

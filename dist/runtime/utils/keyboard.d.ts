/**
 * Determines whether a table control may claim a document-level shortcut.
 *
 * @param event - Keyboard event received by a control's document listener.
 * @returns `false` for handled events and editable controls.
 */
export declare function canHandleTableShortcut(event: KeyboardEvent): boolean;

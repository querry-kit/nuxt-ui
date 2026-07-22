import de from './de.js';
import en from './en.js';
export { de, en };
/** Collision-safe locale payloads for manual vue-i18n integration. */
export declare const querryKitLocales: {
    de: {
        readonly querryKit: {
            readonly table: {
                readonly search: {
                    readonly placeholder: "Suchen";
                };
                readonly sorting: {
                    readonly title: "Sortieren";
                    readonly field: "Feld auswählen";
                    readonly add: "Sortierung hinzufügen";
                    readonly clear: "Sortierung löschen";
                    readonly remove: "Sortierung entfernen";
                    readonly toggle: "Sortierreihenfolge umkehren";
                };
                readonly filtering: {
                    readonly title: "Filtern";
                    readonly field: "Feld auswählen";
                    readonly add: "Filter hinzufügen";
                    readonly clear: "Filter löschen";
                    readonly remove: "Filter entfernen";
                    readonly mode: "Filtermodus wechseln";
                };
                readonly options: {
                    readonly title: "Tabellenoptionen";
                    readonly pin: "Spalte anheften";
                    readonly left: "Links";
                    readonly right: "Rechts";
                    readonly center: "Lösen";
                    readonly visibility: "Spaltensichtbarkeit umschalten";
                };
                readonly pagination: {
                    readonly summary: "{start}–{end} von {total} angezeigt";
                };
            };
        };
    };
    en: {
        readonly querryKit: {
            readonly table: {
                readonly search: {
                    readonly placeholder: "Search";
                };
                readonly sorting: {
                    readonly title: "Sort";
                    readonly field: "Select field";
                    readonly add: "Add sort";
                    readonly clear: "Clear sorting";
                    readonly remove: "Remove sort";
                    readonly toggle: "Toggle sort direction";
                };
                readonly filtering: {
                    readonly title: "Filter";
                    readonly field: "Select field";
                    readonly add: "Add filter";
                    readonly clear: "Clear filters";
                    readonly remove: "Remove filter";
                    readonly mode: "Toggle filter mode";
                };
                readonly options: {
                    readonly title: "Table options";
                    readonly pin: "Pin column";
                    readonly left: "Left";
                    readonly right: "Right";
                    readonly center: "Unpin";
                    readonly visibility: "Toggle column visibility";
                };
                readonly pagination: {
                    readonly summary: "Showing {start}–{end} of {total}";
                };
            };
        };
    };
};

export default {
  '@querry-kit': {
    table: {
      search: { placeholder: 'Suchen' },
      sorting: {
        title: 'Sortieren',
        field: 'Feld auswählen',
        add: 'Sortierung hinzufügen',
        clear: 'Sortierung löschen',
        remove: 'Sortierung entfernen',
        toggle: 'Sortierreihenfolge umkehren',
      },
      filtering: {
        title: 'Filtern',
        field: 'Feld auswählen',
        add: 'Filter hinzufügen',
        clear: 'Filter löschen',
        remove: 'Filter entfernen',
        mode: 'Filtermodus wechseln',
      },
      options: {
        title: 'Tabellenoptionen',
        pin: 'Spalte anheften',
        left: 'Links',
        right: 'Rechts',
        center: 'Lösen',
        visibility: 'Spaltensichtbarkeit umschalten',
      },
      pagination: { summary: '{start}–{end} von {total} angezeigt' },
    },
  },
} as const;

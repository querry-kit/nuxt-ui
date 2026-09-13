import { type FilterField, type FilteringField } from '../types/table.js';
/**
 * Creates the initial Query Kit-compatible state for a selected filter field.
 *
 * @param field - Definition selected in the filtering control.
 * @returns A new filter with a unique ID and type-appropriate default value.
 */
export declare function createFilter(field: FilterField): FilteringField;

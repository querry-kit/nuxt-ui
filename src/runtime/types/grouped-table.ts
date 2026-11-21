import type { GroupBranch, GroupNode, GroupPath, SortingRule } from '@querry-kit/nuxt';
import type { Ref } from 'vue';

/** Display information for a column rendered by QTableGrouped. */
export interface GroupedTableColumn {
  id: string;
  header: string;
  /** Preferred column width in pixels in grouped mode. */
  width?: number;
  align?: 'left' | 'right';
  sortable?: boolean;
  groupedCellClass?: string;
}

/** State and actions supplied by useGroupedTable or a compatible consumer. */
export interface GroupedTableState<TItem> {
  root: GroupBranch<TItem>;
  groups: Readonly<Ref<GroupNode<TItem>[]>>;
  allGroupsExpanded: Readonly<Ref<boolean>>;
  grouping: Readonly<Ref<string[]>>;
  loadingMode: Readonly<Ref<'pagination' | 'infinite'>>;
  sorting: Ref<SortingRule[]>;
  columnPinning: Readonly<Ref<Record<string, string[]>>>;
  itemsPerPage: Ref<number>;
  toggleGroup(path: GroupPath): Promise<void>;
  setAllGroupsExpanded(expanded: boolean): Promise<void>;
  loadMoreGroups(path?: GroupPath): Promise<void>;
  loadMoreItems(path: GroupPath): Promise<void>;
  getItemPage(path?: GroupPath): { page: number; totalItems: number; requestedPage?: number };
  loadItemsPage(path: GroupPath, page: number): Promise<void>;
}

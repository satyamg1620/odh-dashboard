import { RoleBindingKind } from '~/k8sTypes';
import { SortableData } from '~/components/table';
import { firstSubject } from './utils';

export const columnsProjectSharing: SortableData<RoleBindingKind>[] = [
  {
    field: 'username',
    label: 'Name',
    width: 30,
    sortable: (a, b) => firstSubject(a).localeCompare(firstSubject(b)),
  },
  {
    field: 'permission',
    label: 'Permission',
    width: 20,
    sortable: (a, b) => a.roleRef.name.localeCompare(b.roleRef.name),
  },
  {
    field: 'date',
    label: 'Date added',
    width: 25,
    sortable: (a, b) =>
      new Date(b.metadata.creationTimestamp || 0).getTime() -
      new Date(a.metadata.creationTimestamp || 0).getTime(),
  },
];

<<<<<<< HEAD
'use client';

import { selectCurrentColumns } from '@/store/kanban/kanban.selector';
import { useAppSelector } from '@/store/hooks';

=======
import { TColumn } from '@/pages/types/kanban.types';
>>>>>>> parent of bd25395 (types folder moved to root)
import Column from '../column/column.component';
import AddNewColumn from '../../add-new-column/add-new-column.component';

export default function Columns() {
  const columns = useAppSelector(selectCurrentColumns);
  return (
    <>
      {columns &&
        columns.map((column) => <Column key={column.id} column={column} />)}
      <AddNewColumn />
    </>
  );
}

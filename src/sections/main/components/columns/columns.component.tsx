'use client';

import { TColumn } from '@/types/kanban.types';

import Column from '../column/column.component';
import AddNewColumn from '../../add-new-column/add-new-column.component';

type Props = {
  columns: TColumn[];
};

export default function Columns({ columns }: Props) {
  return (
    <>
      {columns.map((column) => (
        <Column key={column._id} column={column} />
      ))}
      <AddNewColumn />
    </>
  );
}

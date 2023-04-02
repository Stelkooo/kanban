import { TColumn } from '@/pages/types/kanban.types';
import Column from '../column/column.component';

type Props = {
  columns: TColumn[];
};

export default function Columns({ columns }: Props) {
  return (
    <>
      {columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </>
  );
}

import { TColumn } from '@/pages/types/kanban.types';

import Tasks from '../tasks/tasks.component';
import { sortByOrder } from '../../utilities';

type Props = {
  column: TColumn;
};

export default function Column({ column }: Props) {
  const tasksSorted = sortByOrder(column.tasks, column.order, 'id');
  return (
    <div className="min-w-[280px]">
      <h2 className="heading-small mb-6 flex uppercase text-medium-grey before:mr-3 before:inline-block before:h-4 before:w-4 before:rounded-full before:bg-purple">
        {column.name} ({column.tasks.length})
      </h2>
      <Tasks tasks={column.tasks} />
    </div>
  );
}

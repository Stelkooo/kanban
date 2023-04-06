import { TColumn } from '@/pages/types/kanban.types';

import Tasks from '../tasks/tasks.component';

type Props = {
  column: TColumn;
};

export default function Column({ column }: Props) {
  const tasksSorted = [...column.tasks].sort(
    (a, b) => column.order.indexOf(a.id) - column.order.indexOf(b.id)
  );
  return (
    <div className="min-w-[280px]">
      <h2 className="heading-small mb-6 flex uppercase text-medium-grey before:mr-3 before:inline-block before:h-4 before:w-4 before:rounded-full before:bg-purple">
        {column.name} ({column.tasks?.length})
      </h2>
      <Tasks tasks={tasksSorted} />
    </div>
  );
}

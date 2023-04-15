'use client';

import { TColumn } from '@/types/kanban.types';

import Tasks from '../tasks/tasks.component';

type Props = {
  column: TColumn;
};

export default function Column({ column }: Props) {
  return (
    <div className="min-w-[280px] max-w-[280px]">
      {column.name && column.tasks && (
        <>
          <h2 className="heading-small mb-6 flex uppercase text-medium-grey before:mr-3 before:inline-block before:h-4 before:w-4 before:rounded-full before:bg-purple">
            {column.name} ({column.tasks.length})
          </h2>
          <Tasks tasks={column.tasks} />
        </>
      )}
    </div>
  );
}

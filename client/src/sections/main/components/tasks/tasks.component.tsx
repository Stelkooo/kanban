'use client';

import { TTask } from '@/types/kanban.types';

import Task from '../task/task.component';

type Props = {
  tasks: TTask[];
};

export default function Tasks({ tasks }: Props) {
  return (
    <div className="grid gap-y-5">
      {tasks && tasks.map((task) => <Task key={task._id} task={task} />)}
    </div>
  );
}

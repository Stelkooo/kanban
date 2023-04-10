'use client';

import { TSubtask } from '@/types/kanban.types';
import SubTask from '../subtask/subtask.component';

type Props = {
  subtasks: TSubtask[];
};

export default function Subtasks({ subtasks }: Props) {
  const subtasksLength = subtasks.length;
  const completedSubtasks = subtasks.filter(
    (subtask) => subtask.isCompleted === true
  ).length;
  return (
    <div>
      <h4 className="body-medium mb-4 text-medium-grey dark:text-white">
        Subtasks ({completedSubtasks} of {subtasksLength})
      </h4>
      <div className="grid gap-y-2">
        {subtasks.map((subtask) => (
          <SubTask subtask={subtask} key={subtask.id} />
        ))}
      </div>
    </div>
  );
}

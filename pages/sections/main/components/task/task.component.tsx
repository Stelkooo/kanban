import { TTask } from '@/types/kanban.types';

type Props = {
  task: TTask;
};

export default function Task({ task }: Props) {
  return (
    <div className="rounded-lg bg-white px-4 py-6">
      <h3 className="heading-medium mb-2">{task.title}</h3>
      <p className="body-medium text-medium-grey">
        {task.subtasks.filter((subtask) => subtask.isCompleted === true).length}{' '}
        of {task.subtasks.length} subtasks
      </p>
    </div>
  );
}

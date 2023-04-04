import { TTask } from '@/types/kanban.types';
import Task from '../task/task.component';

type Props = {
  tasks: TTask[];
};

export default function Tasks({ tasks }: Props) {
  return (
    <div className="grid gap-y-5">
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}

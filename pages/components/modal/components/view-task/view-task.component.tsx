import { TTask } from '@/types/kanban.types';
import ModalTemplate from '../modal-template/modal-template.component';
import Subtasks from './subtasks/subtasks.component';

type Props = {
  task: TTask;
};

export default function ViewTask({ task }: Props) {
  return (
    <ModalTemplate>
      <h3 className="heading-large">{task.title}</h3>
      <p>{task.description}</p>
      <Subtasks subtasks={task.subtasks} />
    </ModalTemplate>
  );
}

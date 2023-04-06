import { TTask } from '@/types/kanban.types';
import Modal from '../template-modal/template-modal.component';
import Subtasks from './subtasks/subtasks.component';

type Props = {
  task: TTask;
};

export default function ViewTask({ task }: Props) {
  return (
    <Modal>
      <h3 className="heading-large">{task.title}</h3>
      {task.description ? <p>{task.description}</p> : null}
      <Subtasks subtasks={task.subtasks} />
    </Modal>
  );
}
import { TTask } from '@/types/kanban.types';
import Modal from '../template-modal/template-modal.component';
import Subtasks from './subtasks/subtasks.component';

type Props = {
  task: TTask;
};

export default function ViewTask({ task }: Props) {
  return (
    <Modal heading={task.title}>
      <h3 className="heading-large">{task.title}</h3>
      {/* {(task.description as string) !== '' &&
        ((<p>{task.description}</p>) as JSX.Element)} */}
      <Subtasks subtasks={task.subtasks} />
    </Modal>
  );
}

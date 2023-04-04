import { TTask } from '@/types/kanban.types';

import MoreOptions from '@/pages/components/more-options/more-options.component';
import ModalTemplate from '../modal-template/modal-template.component';
import Subtasks from './subtasks/subtasks.component';

type Props = {
  task: TTask;
};

export default function ViewTask({ task }: Props) {
  return (
    <ModalTemplate>
      <div className="flex justify-between gap-6">
        <h3 className="heading-large">{task.title}</h3>
        <MoreOptions optionsAbout="task" />
      </div>

      <p className="body-large text-medium-grey">{task.description}</p>
      <Subtasks subtasks={task.subtasks} />
    </ModalTemplate>
  );
}

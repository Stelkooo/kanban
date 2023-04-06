<<<<<<< HEAD
'use client';

import { useAppSelector } from '@/store/hooks';
import { selectCurrentTask } from '@/store/kanban/kanban.selector';

import MoreOptions from '@/pages/components/more-options/more-options.component';
import ModalTemplate from '../modal-template/modal-template.component';
=======
import { TTask } from '@/pages/types/kanban.types';
import Modal from '../../modal.component';
>>>>>>> parent of bd25395 (types folder moved to root)
import Subtasks from './subtasks/subtasks.component';
import Status from './status/status.component';

export default function ViewTask() {
  const task = useAppSelector(selectCurrentTask);
  return (
    task && (
      <ModalTemplate>
        <div className="flex justify-between gap-6">
          <h3 className="heading-large">{task.title}</h3>
          <MoreOptions optionsAbout="task" />
        </div>
        {
          (task.description && (
            <p className="body-large text-medium-grey">{task.description}</p>
          )) as JSX.Element
        }
        <Subtasks subtasks={task.subtasks} />
        <Status task={task} />
      </ModalTemplate>
    )
  );
}

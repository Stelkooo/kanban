import { TTask } from '@/types/kanban.types';

import Button from '@/pages/components/button/button.component';
import ModalTemplate from '../modal-template/modal-template.component';
import Subtasks from './subtasks/subtasks.component';
import Status from './status/status.component';

type Props = {
  task: TTask;
};

export default function EditTask({ task }: Props) {
  return (
    <ModalTemplate>
      <h3 className="heading-large">Edit Task</h3>
      <label htmlFor="title" className="grid gap-y-2">
        <p className="body-medium text-medium-grey">Title</p>
        <input
          type="text"
          id="title"
          className="body-large rounded-[4px] border border-lines-light px-4 py-2"
          placeholder="e.g. Take coffee break"
          defaultValue={task.title}
        />
      </label>
      <label htmlFor="description" className="grid gap-y-2">
        <p className="body-medium text-medium-grey">Description</p>
        <textarea
          rows={4}
          id="description"
          className="body-large resize-none rounded-[4px] border border-lines-light px-4 py-2"
          placeholder="e.g. It’s always good to take a break. This 
          15 minute break will  recharge the batteries 
          a little."
          defaultValue={task.description || ''}
        />
      </label>
      <Subtasks subtasks={task.subtasks} />
      <Status task={task} />
      <Button btnStyle="primarySmall">
        <p className="body-medium">Save Changes</p>
      </Button>
    </ModalTemplate>
  );
}

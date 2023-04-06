import { TColumn } from '@/types/kanban.types';

import Button from '@/pages/components/button/button.component';
import Modal from '../../modal.component';
import Subtasks from './subtasks/subtasks.component';
import Status from './status/status.component';

type Props = {
  columns: TColumn[];
};

export default function AddTask({ columns }: Props) {
  return (
    <Modal>
      <h3 className="heading-large">Add New Task</h3>
      <label htmlFor="title" className="grid gap-y-2">
        <p className="body-medium text-medium-grey">Title</p>
        <input
          type="text"
          id="title"
          className="body-large rounded-[4px] border border-lines-light px-4 py-2"
          placeholder="e.g. Take coffee break"
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
        />
      </label>
      <Subtasks />
      <Status columns={columns} />
      <Button btnStyle="primarySmall">
        <p className="body-medium">Create Task</p>
      </Button>
    </Modal>
  );
}

import { TTask } from '@/types/kanban.types';

import Button from '@/pages/components/button/button.component';
import Modal from '../../modal.component';

type Props = { task: TTask };

export default function DeleteTask({ task }: Props) {
  return (
    <Modal>
      <h3 className="heading-large text-red">Delete this task?</h3>
      <p className="body-large text-medium-grey">
        Are you sure you want to delete the ‘{task.title}’ task and its
        subtasks? This action cannot be reversed.
      </p>
      <div className="flex flex-col gap-4">
        <Button btnStyle="destructive">
          <p className="body-medium">Delete</p>
        </Button>
        <Button btnStyle="secondary">
          <p className="body-medium">Cancel</p>
        </Button>
      </div>
    </Modal>
  );
}

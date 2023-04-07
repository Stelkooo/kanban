import { TTask } from '@/types/kanban.types';

import Button from '@/src/components/button/button.component';
import Modal from '../template-modal/template-modal.component';

type Props = { task: TTask };

export default function DeleteTask({ task }: Props) {
  return (
    <Modal heading="Delete this task?">
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

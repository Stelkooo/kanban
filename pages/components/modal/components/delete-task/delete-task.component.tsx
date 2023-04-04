'use client';

import { useAppDispatch } from '@/store/hooks';
import { setModalToggle } from '@/store/modal/modal.reducer';
import { removeTask } from '@/store/kanban/kanban.reducer';

import { TTask } from '@/types/kanban.types';

import Button from '@/pages/components/button/button.component';
import ModalTemplate from '../modal-template/modal-template.component';

type Props = { task: TTask };

export default function DeleteTask({ task }: Props) {
  const dispatch = useAppDispatch();

  const cancelHandler = () => {
    dispatch(setModalToggle());
  };
  const deleteHandler = () => {
    dispatch(setModalToggle());
    dispatch(removeTask(task));
  };
  return (
    <ModalTemplate>
      <h3 className="heading-large text-red">Delete this task?</h3>
      <p className="body-large text-medium-grey">
        Are you sure you want to delete the ‘{task.title}’ task and its
        subtasks? This action cannot be reversed.
      </p>
      <div className="flex flex-col gap-4">
        <Button btnStyle="destructive" onClickFunc={() => deleteHandler()}>
          <p className="body-medium">Delete</p>
        </Button>
        <Button btnStyle="secondary" onClickFunc={() => cancelHandler()}>
          <p className="body-medium">Cancel</p>
        </Button>
      </div>
    </ModalTemplate>
  );
}

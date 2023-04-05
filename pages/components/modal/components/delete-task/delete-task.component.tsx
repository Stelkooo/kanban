'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalToggle } from '@/store/modal/modal.reducer';
import { removeTask } from '@/store/kanban/kanban.reducer';
import { selectCurrentTask } from '@/store/kanban/kanban.selector';

import Button from '@/pages/components/button/button.component';
import ModalTemplate from '../modal-template/modal-template.component';

export default function DeleteTask() {
  const dispatch = useAppDispatch();

  const task = useAppSelector(selectCurrentTask);

  const cancelHandler = () => {
    dispatch(setModalToggle());
  };
  const deleteHandler = () => {
    if (task) {
      dispatch(setModalToggle());
      dispatch(removeTask(task));
    }
  };
  return (
    task && (
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
    )
  );
}

'use client';

import { useAppDispatch } from '@/store/hooks';
import { setModalToggle } from '@/store/modal/modal.reducer';

import { TTask } from '@/types/kanban.types';

import { boardApi } from '@/store/api/api.store';

import Button from '@/src/components/button/button.component';
import Modal from '../template-modal/template-modal.component';

type Props = { task: TTask };

export default function DeleteTask({ task }: Props) {
  const dispatch = useAppDispatch();

  const [deleteTask, { isLoading }] = boardApi.useDeleteTaskMutation();

  const onClickHandler = async () => {
    await deleteTask(task);
    dispatch(setModalToggle());
  };
  return (
    <Modal heading="Delete this task?" isDanger>
      <p className="body-large text-medium-grey">
        Are you sure you want to delete the ‘{task.title}’ task and its
        subtasks? This action cannot be reversed.
      </p>
      <div className="flex flex-col gap-4">
        <Button
          btnStyle="destructive"
          onClickFunc={() => onClickHandler()}
          isDisabled={isLoading}
          isLoading={isLoading}
        >
          <p className="body-medium">Delete</p>
        </Button>
        <Button
          btnStyle="secondary"
          onClickFunc={() => dispatch(setModalToggle())}
        >
          <p className="body-medium">Cancel</p>
        </Button>
      </div>
    </Modal>
  );
}

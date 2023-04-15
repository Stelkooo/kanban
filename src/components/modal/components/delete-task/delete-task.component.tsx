'use client';

import { useAppDispatch } from '@/store/hooks';
import { setModalToggle } from '@/store/modal/modal.reducer';

import { boardApi } from '@/store/api/api.store';

import Button from '@/src/components/button/button.component';
import Modal from '../template-modal/template-modal.component';
import SkeletonModal from '../skeleton-modal/skeleton-modal.component';

type Props = { taskId: string };

export default function DeleteTask({ taskId }: Props) {
  const dispatch = useAppDispatch();

  const { data: task, isSuccess } = boardApi.useGetTaskQuery(taskId);

  const [deleteTask, { isLoading }] = boardApi.useDeleteTaskMutation();

  const onClickHandler = async () => {
    if (task) await deleteTask(task);
    dispatch(setModalToggle());
  };
  if (isSuccess)
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

  return <SkeletonModal />;
}

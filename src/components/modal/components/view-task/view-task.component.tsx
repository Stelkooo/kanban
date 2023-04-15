'use client';

import { TSubtask } from '@/types/kanban.types';

import { boardApi } from '@/store/api/api.store';

import Modal from '../template-modal/template-modal.component';
import Subtasks from './subtasks/subtasks.component';
import Status from '../status/status.component';
import SkeletonModal from '../skeleton-modal/skeleton-modal.component';

type Props = {
  taskId: string;
};

export default function ViewTask({ taskId }: Props) {
  const { data: task, isSuccess } = boardApi.useGetTaskQuery(taskId);

  const [updateTask] = boardApi.useUpdateTaskMutation();

  const setStatus = (value: string) => {
    updateTask({ ...task, column: { _id: value } });
  };

  let content;

  if (isSuccess && task.column) {
    content = (
      <>
        <Subtasks subtasks={task.subtasks as TSubtask[]} />
        <Status status={task.column._id as string} func={setStatus} />
      </>
    );
    if (task.description) {
      content = (
        <>
          <p className="body-large text-medium-grey">{task.description}</p>
          {content}
        </>
      );
    }
    return (
      <Modal heading={task.title as string} showMoreOptions>
        {content}
      </Modal>
    );
  }

  return <SkeletonModal />;
}

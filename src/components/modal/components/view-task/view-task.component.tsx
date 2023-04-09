'use client';

import { useState, useEffect } from 'react';

import { useAppDispatch } from '@/store/hooks';
import { setModalToggle } from '@/store/modal/modal.reducer';

import { boardApi } from '@/store/api/api.store';

import { TTask } from '@/types/kanban.types';

import Button from '@/src/components/button/button.component';
import Modal from '../template-modal/template-modal.component';
import Subtasks from './subtasks/subtasks.component';
import Status from '../status/status.component';

type Props = {
  task: TTask;
};

export default function ViewTask({ task }: Props) {
  const dispatch = useAppDispatch();

  const [status, setStatus] = useState<string>(task.column.id);

  const [updateTaskStatus] = boardApi.useUpdateTaskStatusMutation();

  const updateStatusHandler = async () => {
    if (status !== task.column.id) {
      try {
        await updateTaskStatus({ task, newColumnId: status });
        dispatch(setModalToggle());
      } catch {
        // do error
      }
    }
  };

  let content = (
    <>
      <Subtasks subtasks={task.subtasks} />
      <Status status={status} setStatus={setStatus} />
      <Button btnStyle="primarySmall" onClickFunc={() => updateStatusHandler()}>
        <p className="body-medium">Save Changes</p>
      </Button>
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
    <Modal heading={task.title} showMoreOptions>
      {content}
    </Modal>
  );
}

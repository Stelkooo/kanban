'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { createTask } from '@/store/kanban/kanban.reducer';

import { TColumn, TSubtask } from '@/types/kanban.types';

import Button from '@/pages/components/button/button.component';
import ModalTemplate from '../modal-template/modal-template.component';
import Subtasks from './subtasks/subtasks.component';
import Status from './status/status.component';

export default function AddTask() {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [subtasks, setSubtasks] = useState<Array<Partial<TSubtask>>>([]);
  const [status, setStatus] = useState<number>(0);

  const createTaskHandler = () => {
    if (
      title &&
      subtasks &&
      subtasks.every((subtask) => subtask.title !== '') &&
      status
    )
      dispatch(
        createTask({
          title,
          description,
          subtasks,
          columnId: status,
        })
      );
  };
  return (
    <ModalTemplate>
      <h3 className="heading-large">Add New Task</h3>
      <label htmlFor="title" className="grid gap-y-2">
        <p className="body-medium text-medium-grey">Title</p>
        <input
          type="text"
          id="title"
          className="body-large rounded-[4px] border border-lines-light px-4 py-2"
          placeholder="e.g. Take coffee break"
          onChange={(e) => setTitle(e.currentTarget.value)}
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
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
      </label>
      <Subtasks subtasks={subtasks} setSubtasks={setSubtasks} />
      <Status setStatus={setStatus} />
      <Button btnStyle="primarySmall" onClickFunc={() => createTaskHandler()}>
        <p className="body-medium">Create Task</p>
      </Button>
    </ModalTemplate>
  );
}

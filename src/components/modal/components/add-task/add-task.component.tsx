'use client';

import { useState } from 'react';

import { TBoard, TSubtask } from '@/types/kanban.types';

import { boardApi } from '@/store/api/api.store';

import Button from '@/src/components/button/button.component';
import Modal from '../template-modal/template-modal.component';
import Status from './status/status.component';
import AddEditList from '../add-edit-list/add-edit-list.component';

type Props = {
  board: TBoard;
};

export default function AddTask({ board }: Props) {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [subtasks, setSubtasks] = useState<Array<Partial<TSubtask>>>([
    { title: '' },
    { title: '' },
  ]);
  const [status, setStatus] = useState<string>(board.columns[0].id as string);

  const [createTask] = boardApi.useCreateTaskMutation();

  const onClickHandler = () => {
    if (title && subtasks.every((subtask) => subtask.title) && status)
      createTask({ column: { id: status }, description, title, subtasks });
  };
  return (
    <Modal heading="Add New Task">
      <label htmlFor="title" className="grid gap-y-2">
        <p className="body-medium text-medium-grey">Title</p>
        <input
          type="text"
          id="title"
          className="body-large rounded-[4px] border border-lines-light px-4 py-2"
          placeholder="e.g. Take coffee break"
          defaultValue={title}
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
          defaultValue={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
      </label>
      <AddEditList
        list={subtasks}
        setList={setSubtasks}
        listType="subtask"
        objNameKey="title"
      />
      <Status status={status} setStatus={setStatus} />
      <Button btnStyle="primarySmall" onClickFunc={() => onClickHandler()}>
        <p className="body-medium">Create Task</p>
      </Button>
    </Modal>
  );
}

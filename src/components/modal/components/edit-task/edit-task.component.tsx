'use client';

import { useState } from 'react';

import { useAppDispatch } from '@/store/hooks';
import { setModalToggle } from '@/store/modal/modal.reducer';

import { TSubtask, TTask } from '@/types/kanban.types';

import { boardApi } from '@/store/api/api.store';

import Button from '@/src/components/button/button.component';
import Modal from '../template-modal/template-modal.component';
import Status from '../status/status.component';
import AddEditSubtasks from '../add-edit-subtasks/add-edit-subtasks.component';

type Props = {
  task: TTask;
};

export default function EditTask({ task }: Props) {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string | null>(
    task.description
  );
  const [subtasks, setSubtasks] = useState<Array<Partial<TSubtask>>>(
    task.subtasks
  );
  const [status, setStatus] = useState<string>(task.column.id);

  const [updateTask, { isLoading }] = boardApi.useUpdateTaskMutation();

  const onClickHandler = async () => {
    if (
      (title && title !== task.title) ||
      description !== task.description ||
      status !== task.column.id
    )
      await updateTask({
        task: { id: task.id, title, description, column: task.column },
        newColumnId: status,
      });
    dispatch(setModalToggle());
  };
  return (
    <Modal heading="Edit Task">
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
          defaultValue={description as string}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
      </label>
      <AddEditSubtasks list={subtasks} setList={setSubtasks} />
      <Status status={status} setStatus={setStatus} />
      <Button
        btnStyle="primarySmall"
        onClickFunc={() => onClickHandler()}
        isDisabled={isLoading}
        isLoading={isLoading}
      >
        <p className="body-medium">Save Changes</p>
      </Button>
    </Modal>
  );
}

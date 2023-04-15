'use client';

import { useEffect, useState } from 'react';

import _ from 'lodash';

import { useAppDispatch } from '@/store/hooks';
import { setModalToggle } from '@/store/modal/modal.reducer';

import { TSubtask } from '@/types/kanban.types';

import { boardApi } from '@/store/api/api.store';

import Button from '@/src/components/button/button.component';
import Modal from '../template-modal/template-modal.component';
import Status from '../status/status.component';
import AddEditSubtasks from '../add-edit-subtasks/add-edit-subtasks.component';
import SkeletonModal from '../skeleton-modal/skeleton-modal.component';

type Props = {
  taskId: string;
};

export default function EditTask({ taskId }: Props) {
  const dispatch = useAppDispatch();

  const { data: task, isSuccess } = boardApi.useGetTaskQuery(taskId);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [subtasks, setSubtasks] = useState<Array<TSubtask>>([]);
  const [status, setStatus] = useState<string>('');

  const [updateTask, { isLoading }] = boardApi.useUpdateTaskMutation();

  const [createSubtask] = boardApi.useCreateSubtaskMutation();
  const [updateSubtask] = boardApi.useUpdateSubtaskMutation();
  const [deleteSubtask] = boardApi.useDeleteSubtaskMutation();

  const onClickHandler = async () => {
    if (task) {
      if (task.column) {
        if (
          (title && title !== task.title) ||
          description !== task.description ||
          status !== task.column._id
        )
          await updateTask({
            ...task,
            title,
            description,
            column: { _id: status },
          });
      }
      if (
        task.subtasks &&
        subtasks !== task.subtasks &&
        subtasks.every((item) => item.title !== '')
      ) {
        // filter out subtasks which do not have an id
        const createdSubtasks = subtasks.filter((item) => !item._id);
        if (createdSubtasks.length)
          createdSubtasks.forEach((item) =>
            createSubtask({ ...item, task: { _id: task._id as string } })
          );
        // filter out subtasks which do have an id
        const updatedSubtasks = subtasks.filter(
          (item) => item._id && !_.some(task.subtasks, { ...item })
        );
        if (updatedSubtasks.length)
          updatedSubtasks.forEach((item) => updateSubtask({ ...item }));
        // filter out columns which are no longer present
        const deletedSubtasks = task.subtasks.filter(
          (item) => !_.some(subtasks, { _id: item._id })
        );
        if (deletedSubtasks.length)
          deletedSubtasks.forEach((item) => deleteSubtask({ ...item }));
      }
    }
    dispatch(setModalToggle());
  };

  useEffect(() => {
    if (task) {
      if (task.title) setTitle(task.title);
      if (task.description) setDescription(task.description);
      if (task.subtasks) setSubtasks(task.subtasks);
      if (task.column) setStatus(task.column._id as string);
    }
  }, [task]);

  if (isSuccess)
    return (
      <Modal heading="Edit Task">
        <label htmlFor="title" className="grid gap-y-2">
          <p className="body-medium text-medium-grey">Title</p>
          <input
            type="text"
            id="title"
            className="body-large rounded-[4px] border border-lines-light px-4 py-2 dark:border-lines-dark dark:bg-dark-grey dark:text-white"
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
            className="body-large resize-none rounded-[4px] border border-lines-light px-4 py-2 dark:border-lines-dark dark:bg-dark-grey dark:text-white"
            placeholder="e.g. It’s always good to take a break. This 
          15 minute break will  recharge the batteries 
          a little."
            defaultValue={description as string}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </label>
        <AddEditSubtasks list={subtasks} setList={setSubtasks} />
        <Status
          status={status}
          func={(value: string) => {
            setStatus(value);
          }}
        />
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

  return <SkeletonModal />;
}

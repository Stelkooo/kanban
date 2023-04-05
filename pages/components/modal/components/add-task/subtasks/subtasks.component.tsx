'use client';

import Image from 'next/image';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import { TSubtask } from '@/types/kanban.types';

import Cross from '@/public/assets/icon-cross.svg';
import Button from '@/pages/components/button/button.component';

type Props = {
  subtasks: Array<Partial<TSubtask>>;
  setSubtasks: Dispatch<SetStateAction<Array<Partial<TSubtask>>>>;
};

export default function Subtasks({ subtasks, setSubtasks }: Props) {
  const removeHandler = (index: number) => {
    if (subtasks.length > 1)
      setSubtasks(subtasks.filter((subtask) => subtask.id !== index));
  };
  const onChangeHandler = (index: number, e: HTMLInputElement) => {
    setSubtasks(
      subtasks.map((item) =>
        item.id === index ? { ...item, title: e.value } : item
      )
    );
  };
  const addHandler = () => {
    setSubtasks([...subtasks, { title: '', id: subtasks.length + 1 }]);
  };
  useEffect(() => {
    setSubtasks([
      { title: '', id: 0 },
      { title: '', id: 1 },
    ]);
  }, [setSubtasks]);
  return (
    <div>
      <p className="body-medium mb-2 text-medium-grey">Subtasks</p>
      <div className="grid gap-y-2">
        {subtasks.map((subtask, index) => (
          <div className="flex items-center" key={subtask.id}>
            <input
              type="text"
              className="body-large mr-4 w-full rounded-[4px] border border-lines-light px-4 py-2"
              placeholder="e.g. Take coffee break"
              defaultValue={subtask.title}
              onChange={(e) => onChangeHandler(index, e.currentTarget)}
            />
            <Button btnStyle="clear" onClickFunc={() => removeHandler(index)}>
              <Image
                src={Cross}
                alt="Click to remove subtask"
                className="cursor-pointer"
              />
            </Button>
          </div>
        ))}
        <Button btnStyle="secondary" onClickFunc={() => addHandler()}>
          <p className="body-medium">Add New Subtask</p>
        </Button>
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import { useState } from 'react';

import Cross from '@/public/assets/icon-cross.svg';
import Button from '@/pages/components/button/button.component';

export default function Subtasks() {
  const [subtasks, setSubtasks] = useState([
    { title: '', id: 1 },
    { title: '', id: 2 },
  ]);
  const removeHandler = (id: number) => {
    if (subtasks.length > 1)
      setSubtasks(subtasks.filter((subtask) => subtask.id !== id));
  };
  const onChangeHandler = (index: number, e: HTMLInputElement) => {
    setSubtasks(
      subtasks.map((item) =>
        item.id === index ? { ...item, title: e.value } : item
      )
    );
  };
  const addHandler = () => {
    setSubtasks([
      ...subtasks,
      { title: '', id: subtasks[subtasks.length - 1].id + 1 },
    ]);
  };
  return (
    <div>
      <p className="body-medium mb-2 text-medium-grey">Subtasks</p>
      <div className="grid gap-y-2">
        {subtasks.map((subtask) => (
          <div className="flex items-center" key={subtask.id}>
            <input
              type="text"
              className="body-large mr-4 w-full rounded-[4px] border border-lines-light px-4 py-2"
              placeholder="e.g. Take coffee break"
              defaultValue={subtask.title}
              onChange={(e) => onChangeHandler(subtask.id, e.currentTarget)}
            />
            <Button
              btnStyle="clear"
              onClickFunc={() => removeHandler(subtask.id)}
            >
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

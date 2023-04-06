'use client';

import Image from 'next/image';
import { useState } from 'react';

import Cross from '@/public/assets/icon-cross.svg';
import Button from '@/pages/components/button/button.component';
import { TSubtask } from '@/pages/types/kanban.types';

type Props = {
  subtasks: TSubtask[];
};

export default function Subtasks({ subtasks }: Props) {
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
              // onChange={(e) => onChangeHandler(subtask.id, e.currentTarget)}
            />
            <Button
              btnStyle="clear"
              // onClickFunc={() => removeHandler(subtask.id)}
            >
              <Image
                src={Cross}
                alt="Click to remove subtask"
                className="cursor-pointer"
              />
            </Button>
          </div>
        ))}
        {/* onClickFunc={() => addHandler()} */}
        <Button btnStyle="secondary">
          <p className="body-medium">Add New Subtask</p>
        </Button>
      </div>
    </div>
  );
}

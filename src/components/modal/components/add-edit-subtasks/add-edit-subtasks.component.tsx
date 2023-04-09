'use client';

import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

import { TSubtask } from '@/types/kanban.types';

import Cross from '@/public/assets/icon-cross.svg';
import Button from '@/src/components/button/button.component';

type Props = {
  list: Array<Partial<TSubtask>>;
  setList: Dispatch<SetStateAction<Array<Partial<TSubtask>>>>;
};

export default function AddEditSubtasks({ list, setList }: Props) {
  const addHandler = () => {
    setList([...list, { title: '' }]);
  };
  const onChangeHandler = (itemIndex: number, e: HTMLInputElement) => {
    setList(
      list.map((item, index) =>
        index === itemIndex ? { ...item, title: e.value } : item
      )
    );
  };
  const removeHandler = (itemIndex: number) => {
    if (list.length > 1)
      setList(list.filter((item, index) => index !== itemIndex));
  };
  return (
    <div>
      <p className="body-medium mb-2 capitalize text-medium-grey">Subtasks</p>
      <div className="grid gap-y-2">
        {list.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className="flex items-center" key={index}>
            <input
              type="text"
              className="body-large mr-4 w-full rounded-[4px] border border-lines-light px-4 py-2"
              placeholder="e.g. Done"
              defaultValue={item.title}
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
          <p className="body-medium capitalize">Add New Subtask</p>
        </Button>
      </div>
    </div>
  );
}

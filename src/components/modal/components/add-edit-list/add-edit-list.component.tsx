'use client';

import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

import { TColumn } from '@/types/kanban.types';

import Cross from '@/public/assets/icon-cross.svg';
import Button from '@/src/components/button/button.component';

export type TListObj = {
  list: Array<Partial<TColumn>>;
  setList: Dispatch<SetStateAction<Array<Partial<TColumn>>>>;
  listType: 'column' | 'subtask';
  objNameKey: string;
};

type Props = {
  listObj: TListObj;
};

export default function AddEditList({
  listObj: { list, listType, objNameKey, setList },
}: Props) {
  const addHandler = () => {
    setList([...list, { [objNameKey]: '' }]);
  };
  const onChangeHandler = (itemIndex: number, e: HTMLInputElement) => {
    setList(
      list.map((item, index) =>
        index === itemIndex ? { ...item, [objNameKey]: e.value } : item
      )
    );
  };
  const removeHandler = (itemIndex: number) => {
    if (list.length > 1)
      setList(list.filter((item, index) => index !== itemIndex));
  };
  return (
    <div>
      <p className="body-medium mb-2 capitalize text-medium-grey">
        {listType}s
      </p>
      <div className="grid gap-y-2">
        {list.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className="flex items-center" key={index}>
            <input
              type="text"
              className="body-large mr-4 w-full rounded-[4px] border border-lines-light px-4 py-2"
              placeholder="e.g. Done"
              defaultValue={item.name}
              onChange={(e) => onChangeHandler(index, e.currentTarget)}
            />
            <Button btnStyle="clear" onClickFunc={() => removeHandler(index)}>
              <Image
                src={Cross}
                alt={`Click to remove ${listType}`}
                className="cursor-pointer"
              />
            </Button>
          </div>
        ))}
        <Button btnStyle="secondary" onClickFunc={() => addHandler()}>
          <p className="body-medium capitalize">Add New {listType}</p>
        </Button>
      </div>
    </div>
  );
}

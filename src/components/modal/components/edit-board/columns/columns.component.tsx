'use client';

import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

import { TColumn } from '@/types/kanban.types';

import Cross from '@/public/assets/icon-cross.svg';
import Button from '@/src/components/button/button.component';

type Props = {
  columns: Array<Partial<TColumn>>;
  setColumns: Dispatch<SetStateAction<Array<Partial<TColumn>>>>;
};

export default function Columns({ columns, setColumns }: Props) {
  const addHandler = () => {
    setColumns([...columns, { name: '' }]);
  };
  const onChangeHandler = (columnIndex: number, e: HTMLInputElement) => {
    setColumns(
      columns.map((item, index) =>
        index === columnIndex ? { ...item, name: e.value } : item
      )
    );
  };
  const removeHandler = (columnIndex: number) => {
    if (columns.length > 1)
      setColumns(columns.filter((item, index) => index !== columnIndex));
  };
  return (
    <div>
      <p className="body-medium mb-2 text-medium-grey">Columns</p>
      <div className="grid gap-y-2">
        {columns.map((column, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className="flex items-center" key={index}>
            <input
              type="text"
              className="body-large mr-4 w-full rounded-[4px] border border-lines-light px-4 py-2"
              placeholder="e.g. Done"
              defaultValue={column.name}
              onChange={(e) => onChangeHandler(index, e.currentTarget)}
            />
            <Button btnStyle="clear" onClickFunc={() => removeHandler(index)}>
              <Image
                src={Cross}
                alt="Click to remove column"
                className="cursor-pointer"
              />
            </Button>
          </div>
        ))}
        <Button btnStyle="secondary" onClickFunc={() => addHandler()}>
          <p className="body-medium">Add New Column</p>
        </Button>
      </div>
    </div>
  );
}

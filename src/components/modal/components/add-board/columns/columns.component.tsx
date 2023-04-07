'use client';

import Image from 'next/image';
import { useState } from 'react';

import Cross from '@/public/assets/icon-cross.svg';
import Button from '@/src/components/button/button.component';

export default function Columns() {
  const [columns, setColumns] = useState([
    { title: 'Todo', id: 1 },
    { title: 'Doing', id: 2 },
  ]);
  const removeHandler = (id: number) => {
    if (columns.length > 1)
      setColumns(columns.filter((subtask) => subtask.id !== id));
  };
  const onChangeHandler = (index: number, e: HTMLInputElement) => {
    setColumns(
      columns.map((item) =>
        item.id === index ? { ...item, title: e.value } : item
      )
    );
  };
  const addHandler = () => {
    setColumns([
      ...columns,
      { title: '', id: columns[columns.length - 1].id + 1 },
    ]);
  };
  return (
    <div>
      <p className="body-medium mb-2 text-medium-grey">Columns</p>
      <div className="grid gap-y-2">
        {columns.map((column) => (
          <div className="flex items-center" key={column.id}>
            <input
              type="text"
              className="body-large mr-4 w-full rounded-[4px] border border-lines-light px-4 py-2"
              placeholder="e.g. Done"
              defaultValue={column.title}
              onChange={(e) => onChangeHandler(column.id, e.currentTarget)}
            />
            <Button
              btnStyle="clear"
              onClickFunc={() => removeHandler(column.id)}
            >
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

'use client';

import { useState, useEffect } from 'react';

import _ from 'lodash';

import data from '@/public/data/data.json';

import { TColumn } from '@/pages/types/kanban.types';

import Button from '@/pages/components/button/button.component';
import Columns from './components/columns/columns.component';

import { sortByOrder } from './utilities';
import AddTask from '@/pages/components/modal/components/add-task/add-task.component';

export default function Main() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState<TColumn[]>();

  useEffect(() => {
    const boardInitData = data.boards.find((item) => item.id === 1);
    if (boardInitData) {
      setBoard(boardInitData);
      setColumns(sortByOrder(boardInitData.columns, boardInitData.order, 'id'));
    }
  }, []);

  return (
    <main className="relative flex gap-6 overflow-auto bg-light-grey px-4 py-6">
      {_.isEmpty(board) ? (
        <div className="absolute top-1/2 -translate-y-1/2 px-4 text-center">
          <h2 className="heading-large mb-6 text-medium-grey">
            This board is empty. Create a new column to get started.
          </h2>
          <Button btnStyle="primaryLarge">
            <p className="heading-medium">Add New Column</p>
          </Button>
        </div>
      ) : (
        <>
          <Columns columns={columns} />
          <AddTask columns={columns} />
        </>
      )}
      {/* <Sidebar boards={data.boards} currentBoard={board} /> */}
    </main>
  );
}

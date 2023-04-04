'use client';

import { useAppSelector } from '@/store/hooks';
import { selectCurrentBoard } from '@/store/kanban/kanban.selector';
import { selectIsModalOpen } from '@/store/modal/modal.selector';

import _ from 'lodash';

import Button from '@/pages/components/button/button.component';
import Modal from '@/pages/components/modal/modal.component';
import Columns from './components/columns/columns.component';

export default function Main() {
  const board = useAppSelector(selectCurrentBoard);
  const isModalOpen = useAppSelector(selectIsModalOpen);

  return (
    <main className="relative col-span-2 flex gap-6 overflow-auto bg-light-grey px-4 py-6 md:col-span-1">
      {board && _.isEmpty(board) ? (
        <div className="absolute top-1/2 -translate-y-1/2 px-4 text-center">
          <h2 className="heading-large mb-6 text-medium-grey">
            This board is empty. Create a new column to get started.
          </h2>
          <Button btnStyle="primaryLarge">
            <p className="heading-medium">Add New Column</p>
          </Button>
        </div>
      ) : (
        <Columns />
      )}
      {isModalOpen && <Modal />}
    </main>
  );
}

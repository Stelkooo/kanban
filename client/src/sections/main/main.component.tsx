'use client';

import _ from 'lodash';

import { TBoard } from '@/types/kanban.types';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalType, setModalToggle } from '@/store/modal/modal.reducer';
import { selectIsModalOpen } from '@/store/modal/modal.selector';
import selectIsSidebarOpen from '@/store/sidebar/sidebar.selector';

import Button from '@/src/components/button/button.component';
import Modal from '@/src/components/modal/modal.component';
import Columns from './components/columns/columns.component';

type Props = {
  board: TBoard;
};

export default function Main({ board }: Props) {
  const dispatch = useAppDispatch();

  const isModalOpen = useAppSelector(selectIsModalOpen);
  const isSidebarOpen = useAppSelector(selectIsSidebarOpen);

  const onClickHandler = () => {
    dispatch(setModalType('edit-board'));
    dispatch(setModalToggle());
  };
  return (
    <main
      className={`relative col-span-2 flex gap-6 overflow-auto bg-light-grey px-4 py-6 dark:bg-very-dark-grey ${
        isSidebarOpen ? 'md:col-span-1' : 'md:col-span-2'
      }`}
    >
      {_.isEmpty(board?.columns) ? (
        <div className="absolute top-1/2 -translate-y-1/2 px-4 text-center">
          <h2 className="heading-large mb-6 text-medium-grey">
            This board is empty. Create a new column to get started.
          </h2>
          <Button btnStyle="primaryLarge" onClickFunc={() => onClickHandler()}>
            <p className="heading-medium">Add New Column</p>
          </Button>
        </div>
      ) : (
        board.columns && <Columns columns={board.columns} />
      )}
      {isModalOpen && <Modal />}
    </main>
  );
}

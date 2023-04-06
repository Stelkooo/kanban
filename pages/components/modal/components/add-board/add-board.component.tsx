<<<<<<< HEAD
'use client';

import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createBoard, setCurrentBoardId } from '@/store/kanban/kanban.reducer';
import { setModalToggle } from '@/store/modal/modal.reducer';
import { selectBoards } from '@/store/kanban/kanban.selector';

import { TColumn } from '@/types/kanban.types';

=======
import { TBoard } from '@/pages/types/kanban.types';
>>>>>>> parent of bd25395 (types folder moved to root)
import Button from '@/pages/components/button/button.component';
import ModalTemplate from '../modal-template/modal-template.component';
import Columns from './columns/columns.component';

export default function AddBoard() {
  const dispatch = useAppDispatch();
  const boards = useAppSelector(selectBoards);

  const [name, setName] = useState<string>();
  const [columns, setColumns] = useState<TColumn[]>([]);

  const createBoardHandler = () => {
    if (name) {
      dispatch(
        createBoard({
          name,
          columns,
          id: boards[boards.length - 1].id + 1,
          order: columns.map((el) => el.id),
        })
      );
      dispatch(setCurrentBoardId(boards[boards.length - 1].id + 1));
      dispatch(setModalToggle());
    }
  };
  return (
    <ModalTemplate>
      <h3 className="heading-large">Add New Board</h3>
      <label htmlFor="name" className="grid gap-y-2">
        <p className="body-medium text-medium-grey">Name</p>
        <input
          type="text"
          id="name"
          className={`body-large relative rounded-[4px] border px-4 py-2 outline-none hover:border-purple ${
            name ? 'border-lines-light' : 'border-red'
          } ${name ? 'focus:border-purple' : 'focus:border-red'}`}
          placeholder="e.g. Take coffee break"
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </label>
      <Columns columns={columns} setColumns={setColumns} />
      <Button btnStyle="primarySmall" onClickFunc={() => createBoardHandler()}>
        <p className="body-medium">Create Board</p>
      </Button>
    </ModalTemplate>
  );
}

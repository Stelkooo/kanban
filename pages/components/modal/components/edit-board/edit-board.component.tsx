<<<<<<< HEAD
'use client';

import { useState } from 'react';

import { useAppDispatch } from '@/store/hooks';
import { setBoardColumns, setBoardName } from '@/store/kanban/kanban.reducer';
import { setModalToggle } from '@/store/modal/modal.reducer';

import { TBoard, TColumn } from '@/types/kanban.types';
=======
import { TBoard } from '@/pages/types/kanban.types';
>>>>>>> parent of bd25395 (types folder moved to root)

import Button from '@/pages/components/button/button.component';
import ModalTemplate from '../modal-template/modal-template.component';
import Columns from './columns/columns.component';

type Props = { board: TBoard };

export default function EditBoard({ board }: Props) {
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>(board.name);
  const [columns, setColumns] = useState<TColumn[]>(board.columns);

  const onClickHandler = () => {
    if (name !== board.name) dispatch(setBoardName(name));
    if (columns !== board.columns) dispatch(setBoardColumns(columns));
    dispatch(setModalToggle());
  };
  return (
    <ModalTemplate>
      <h3 className="heading-large">Edit Board</h3>
      <label htmlFor="title" className="grid gap-y-2">
        <p className="body-medium text-medium-grey">Name</p>
        <input
          type="text"
          id="title"
          className="body-large rounded-[4px] border border-lines-light px-4 py-2"
          placeholder="e.g. Take coffee break"
          defaultValue={board.name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </label>
      <Columns columns={columns} setColumns={setColumns} />
      <Button btnStyle="primarySmall" onClickFunc={() => onClickHandler()}>
        <p className="body-medium">Save Changes</p>
      </Button>
    </ModalTemplate>
  );
}

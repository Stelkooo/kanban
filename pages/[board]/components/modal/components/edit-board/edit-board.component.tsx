'use client';

import { useState } from 'react';

import { useAppDispatch } from '@/store/hooks';
import { setModalToggle } from '@/store/modal/modal.reducer';

import { TBoard, TColumn } from '@/types/kanban.types';

import { boardApi } from '@/store/api/api.store';

import _ from 'lodash';

import Button from '@/pages/[board]/components/button/button.component';
import Modal from '../template-modal/template-modal.component';
import Columns from './columns/columns.component';

type Props = { board: TBoard };

export default function EditBoard({ board }: Props) {
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>(board.name);
  const [columns, setColumns] = useState<Array<Partial<TColumn>>>(
    board.columns
  );

  const [updateBoard] = boardApi.useUpdateBoardMutation();
  const [updateBoardColumns] = boardApi.useUpdateBoardColumnsMutation();

  const onClickHandler = () => {
    if (name !== board.name) updateBoard({ ...board, name });
    if (
      columns !== board.columns &&
      columns.every((item) => item.name !== '')
    ) {
      const boardId = board.id;
      // filter out columns which do not have an id
      const createdColumns = columns.filter((item) => !item.id);
      // filter out columns which do have an id
      const updatedColumns = columns.filter((item) => item.id);
      // filter out columns which are no longer present
      const deletedColumns = board.columns.filter(
        (item) => _.findKey(columns, { id: item.id }) === undefined
      );
      updateBoardColumns({
        boardId,
        createdColumns,
        updatedColumns,
        deletedColumns,
      });
    }
    dispatch(setModalToggle());
  };
  return (
    <Modal heading="Edit Board">
      <label htmlFor="title" className="grid gap-y-2">
        <p className="body-medium text-medium-grey">Name</p>
        <input
          type="text"
          id="title"
          className="body-large rounded-[4px] border border-lines-light px-4 py-2"
          placeholder="e.g. Take coffee break"
          defaultValue={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </label>
      <Columns columns={columns} setColumns={setColumns} />
      <Button btnStyle="primarySmall" onClickFunc={() => onClickHandler()}>
        <p className="body-medium">Save Changes</p>
      </Button>
    </Modal>
  );
}

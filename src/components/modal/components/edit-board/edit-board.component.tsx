'use client';

import { useState } from 'react';

import { useAppDispatch } from '@/store/hooks';
import { setModalToggle } from '@/store/modal/modal.reducer';

import { TBoard, TColumn } from '@/types/kanban.types';

import { boardApi } from '@/store/api/api.store';

import _ from 'lodash';

import BoardModal from '../board-modal/board-modal.component';

type Props = { board: TBoard };

export default function EditBoard({ board }: Props) {
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>(board.name);
  const [columns, setColumns] = useState<Array<Partial<TColumn>>>(
    board.columns
  );

  const [updateBoard, { isLoading: isBoardLoading }] =
    boardApi.useUpdateBoardMutation();
  const [updateBoardColumns, { isLoading: isColumnsLoading }] =
    boardApi.useUpdateBoardColumnsMutation();

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
    <BoardModal
      addOrEdit="edit"
      isLoading={isBoardLoading || isColumnsLoading}
      listObj={{
        list: columns,
        listType: 'column',
        objNameKey: 'name',
        setList: setColumns,
      }}
      nameObj={{ name, setName }}
      onClickFunc={() => onClickHandler()}
    />
  );
}

'use client';

import { useState } from 'react';

import _ from 'lodash';

import { useAppDispatch } from '@/store/hooks';
import { setModalToggle } from '@/store/modal/modal.reducer';

import { TBoard, TColumn } from '@/types/kanban.types';

import { boardApi } from '@/store/api/api.store';

import BoardModal from '../board-modal/board-modal.component';

type Props = { board: TBoard };

export default function EditBoard({ board }: Props) {
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>(board.name as string);
  const [columns, setColumns] = useState<Array<TColumn>>(
    board.columns as TColumn[]
  );

  const [updateBoard, { isLoading: isBoardLoading }] =
    boardApi.useUpdateBoardMutation();

  const [updateColumn, { isLoading: isUpdateColumnLoading }] =
    boardApi.useUpdateColumnMutation();
  const [createColumn, { isLoading: isCreateColumnLoading }] =
    boardApi.useCreateColumnMutation();
  const [deleteColumn, { isLoading: isDeleteColumnLoading }] =
    boardApi.useDeleteColumnMutation();

  const onClickHandler = () => {
    if (name !== board.name) {
      updateBoard({ ...board, name });
    }
    if (
      columns !== board.columns &&
      columns.every((item) => item.name !== '') &&
      board.columns
    ) {
      // filter out columns which do not have an id
      const createdColumns = columns.filter((item) => !item._id);
      if (createdColumns.length)
        createdColumns.forEach((item) =>
          createColumn({ ...item, board: { _id: board._id as string } })
        );
      // filter out columns which do have an id
      const updatedColumns = columns.filter(
        (item) => item._id && !_.some(board.columns, { ...item })
      );
      if (updatedColumns.length)
        updatedColumns.forEach((item) => updateColumn(item as TColumn));
      // filter out columns which are no longer present
      const deletedColumns = board.columns.filter(
        (item) => !_.some(columns, { _id: item._id })
      );
      if (deletedColumns.length)
        deletedColumns.forEach((item) => deleteColumn(item as TColumn));
    }
    dispatch(setModalToggle());
  };
  return (
    <BoardModal
      addOrEdit="edit"
      isLoading={
        isBoardLoading ||
        isUpdateColumnLoading ||
        isCreateColumnLoading ||
        isDeleteColumnLoading
      }
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

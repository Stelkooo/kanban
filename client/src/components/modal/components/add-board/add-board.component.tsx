'use client';

import { useRouter } from 'next/router';
import { useState } from 'react';

import { useAppDispatch } from '@/store/hooks';
import { setModalToggle } from '@/store/modal/modal.reducer';

import { boardApi } from '@/store/api/api.store';

import { TColumn } from '@/types/kanban.types';

import BoardModal from '../board-modal/board-modal.component';

export default function AddBoard() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>('');
  const [columns, setColumns] = useState<Array<Partial<TColumn>>>([
    { name: 'Todo' },
    { name: 'Doing' },
  ]);

  const [createBoard, { isLoading: isCreateBoardLoading }] =
    boardApi.useCreateBoardMutation();
  const [createColumn, { isLoading: isCreateColumnLoading }] =
    boardApi.useCreateColumnMutation();

  const onClickHandler = async () => {
    try {
      if (name !== '' && columns.every((item) => item.name !== '')) {
        const board = await createBoard(name).unwrap();
        columns.forEach(
          (item) =>
            board._id &&
            createColumn({
              ...item,
              board: {
                _id: board._id,
              },
            })
        );
        router.push(`/${board._id}`);
      }
    } catch {
      // error
    }
    dispatch(setModalToggle());
  };
  return (
    <BoardModal
      addOrEdit="add"
      isLoading={isCreateBoardLoading || isCreateColumnLoading}
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

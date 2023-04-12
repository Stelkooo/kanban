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

  const [createBoard, { isLoading: isBoardLoading }] =
    boardApi.useCreateBoardMutation();
  const [createColumns, { isLoading: isColumnsLoading }] =
    boardApi.useUpdateBoardColumnsMutation();

  const onClickHandler = async () => {
    if (name !== '' && columns.every((item) => item.name !== '')) {
      try {
        const boardData = await createBoard({ name, columns }).unwrap();
        await createColumns({
          boardId: boardData.id as string,
          createdColumns: columns,
          deletedColumns: [],
          updatedColumns: [],
        });
        dispatch(setModalToggle());
        router.push(`/${boardData.id}`);
      } catch (error) {
        // error
      }
    }
  };
  return (
    <BoardModal
      addOrEdit="add"
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

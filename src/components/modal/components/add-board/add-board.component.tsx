'use client';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { BeatLoader } from 'react-spinners';

import { useAppDispatch } from '@/store/hooks';
import { setModalToggle } from '@/store/modal/modal.reducer';

import { boardApi } from '@/store/api/api.store';

import { TColumn } from '@/types/kanban.types';

import Button from '@/src/components/button/button.component';
import Modal from '../template-modal/template-modal.component';
import AddEditList from '../add-edit-list/add-edit-list.component';

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
    <Modal heading="Add New Board">
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
      <AddEditList
        list={columns}
        setList={setColumns}
        listType="column"
        objNameKey="name"
      />
      <Button
        btnStyle="primarySmall"
        onClickFunc={() => onClickHandler()}
        isDisabled={isBoardLoading || isColumnsLoading}
      >
        {isBoardLoading || isColumnsLoading ? (
          <BeatLoader size={11} color="white" aria-label="Loading Spinner" />
        ) : (
          <p className="body-medium">Create New Board</p>
        )}
      </Button>
    </Modal>
  );
}

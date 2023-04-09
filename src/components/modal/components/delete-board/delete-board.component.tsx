'use client';

import { useRouter } from 'next/router';

import { useAppDispatch } from '@/store/hooks';
import { setModalToggle } from '@/store/modal/modal.reducer';

import { boardApi } from '@/store/api/api.store';

import { TBoard } from '@/types/kanban.types';

import Button from '@/src/components/button/button.component';
import Modal from '../template-modal/template-modal.component';

type Props = { board: TBoard };

export default function DeleteBoard({ board }: Props) {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [deleteBoard, { isLoading }] = boardApi.useDeleteBoardMutation();

  const onClickHandler = async () => {
    await deleteBoard(board);
    dispatch(setModalToggle());
    router.replace('/');
  };
  return (
    <Modal heading="Delete this board?">
      <p className="body-large text-medium-grey">
        Are you sure you want to delete the ‘{board.name}’ board? This action
        will remove all columns and tasks and cannot be reversed.
      </p>
      <div className="flex flex-col gap-4">
        <Button
          btnStyle="destructive"
          onClickFunc={() => onClickHandler()}
          isDisabled={isLoading}
          isLoading={isLoading}
        >
          <p className="body-medium">Delete</p>
        </Button>
        <Button
          btnStyle="secondary"
          onClickFunc={() => dispatch(setModalToggle())}
        >
          <p className="body-medium">Cancel</p>
        </Button>
      </div>
    </Modal>
  );
}

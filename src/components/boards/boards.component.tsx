import { useRouter } from 'next/router';

import { useAppDispatch } from '@/store/hooks';
import { setModalToggle, setModalType } from '@/store/modal/modal.reducer';

import { TBoard } from '@/types/kanban.types';

import { boardApi } from '@/store/api/api.store';
import BoardButton from '../board-button/board-button.component';

type Props = {
  boards: TBoard[];
  setIsMenuOpen?: () => void;
};

export default function Boards({ boards, setIsMenuOpen }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const currentBoard = boardApi.endpoints.getBoard.useQueryState(
    router.query.board as string
  );
  const onClickHandler = (id: string) => {
    if (setIsMenuOpen !== undefined) setIsMenuOpen();
    router.push(id);
  };
  const onCreateHandler = () => {
    if (setIsMenuOpen !== undefined) setIsMenuOpen();
    dispatch(setModalType('add-board'));
    dispatch(setModalToggle());
  };
  return (
    <div className="mr-6 flex flex-col md:mr-0">
      {boards.map((board) =>
        board.id === currentBoard.data?.id ? (
          <BoardButton
            text={board.name}
            btnStyle="selected"
            svg="board"
            key={board.id}
          />
        ) : (
          <BoardButton
            text={board.name}
            btnStyle="default"
            svg="board"
            onClickFunc={() => onClickHandler(board.id)}
            key={board.id}
          />
        )
      )}
      <BoardButton
        btnStyle="create"
        text="Create New Board"
        svg="board"
        onClickFunc={() => onCreateHandler()}
      />
    </div>
  );
}

Boards.defaultProps = {
  setIsMenuOpen: null,
};

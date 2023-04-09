import { useRouter } from 'next/router';

import { useAppDispatch } from '@/store/hooks';
import {
  setModalToggle,
  setModalType,
  setBoard,
} from '@/store/modal/modal.reducer';

import { boardApi } from '@/store/api/api.store';

export default function AddNewColumn() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const { data } = boardApi.endpoints.getBoard.useQueryState(
    router.query.board as string
  );

  const onClickHandler = () => {
    if (data) {
      dispatch(setBoard(data));
      dispatch(setModalType('edit-board'));
      dispatch(setModalToggle());
    }
  };
  return (
    <button
      type="button"
      className="mt-10 grid h-full min-w-[280px] place-content-center rounded-md bg-lines-light"
      onClick={() => onClickHandler()}
    >
      <h2 className="heading-large text-medium-grey">New Column</h2>
    </button>
  );
}

'use client';

import { useAppDispatch } from '@/store/hooks';
import { setModalType, setModalToggle } from '@/store/modal/modal.reducer';

export default function AddNewColumn() {
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    dispatch(setModalType('edit-board'));
    dispatch(setModalToggle());
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

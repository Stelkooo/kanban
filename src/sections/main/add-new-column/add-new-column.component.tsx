import { useAppDispatch } from '@/store/hooks';
import { setModalToggle, setModalType } from '@/store/modal/modal.reducer';

export default function AddNewColumn() {
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    dispatch(setModalType('edit-board'));
    dispatch(setModalToggle());
  };
  return (
    <button
      type="button"
      className="group/newColumn mt-10 grid h-full min-w-[280px] place-content-center rounded-md bg-lines-light transition-colors dark:bg-dark-grey"
      onClick={() => onClickHandler()}
    >
      <h2 className="heading-large text-medium-grey transition-colors group-hover/newColumn:text-purple-hover">
        New Column
      </h2>
    </button>
  );
}

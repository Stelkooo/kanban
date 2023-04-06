import { TBoard } from '@/types/kanban.types';
import Button from '@/pages/components/button/button.component';
import Modal from '../template-modal/template-modal.component';
import Columns from './columns/columns.component';

type Props = {
  board: TBoard;
};

export default function AddBoard({ board }: Props) {
  return (
    <Modal>
      <h3 className="heading-large">Add New Board</h3>
      <label htmlFor="title" className="grid gap-y-2">
        <p className="body-medium text-medium-grey">Name</p>
        <input
          type="text"
          id="title"
          className="body-large rounded-[4px] border border-lines-light px-4 py-2"
          placeholder="e.g. Take coffee break"
        />
      </label>
      <Columns />
      <Button btnStyle="primarySmall">
        <p className="body-medium">Create New Board</p>
      </Button>
    </Modal>
  );
}

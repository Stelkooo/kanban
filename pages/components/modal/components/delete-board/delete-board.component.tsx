import { TBoard } from '@/types/kanban.types';

import Button from '@/pages/components/button/button.component';
import ModalTemplate from '../modal-template/modal-template.component';

type Props = { board: TBoard };

export default function DeleteBoard({ board }: Props) {
  return (
    <ModalTemplate>
      <h3 className="heading-large text-red">Delete this board?</h3>
      <p className="body-large text-medium-grey">
        Are you sure you want to delete the ‘{board.name}’ board? This action
        will remove all columns and tasks and cannot be reversed.
      </p>
      <div className="flex flex-col gap-4">
        <Button btnStyle="destructive">
          <p className="body-medium">Delete</p>
        </Button>
        <Button btnStyle="secondary">
          <p className="body-medium">Cancel</p>
        </Button>
      </div>
    </ModalTemplate>
  );
}

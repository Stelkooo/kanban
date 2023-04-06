import _ from 'lodash';

import { TBoard } from '@/types/kanban.types';

import Button from '@/pages/[board]/components/button/button.component';
import Columns from './components/columns/columns.component';

type Props = {
  board: TBoard;
};

export default function Main({ board }: Props) {
  return (
    <main className="relative col-span-2 flex gap-6 overflow-auto bg-light-grey px-4 py-6 md:col-span-1">
      {_.isEmpty(board) ? (
        <div className="absolute top-1/2 -translate-y-1/2 px-4 text-center">
          <h2 className="heading-large mb-6 text-medium-grey">
            This board is empty. Create a new column to get started.
          </h2>
          <Button btnStyle="primaryLarge">
            <p className="heading-medium">Add New Column</p>
          </Button>
        </div>
      ) : (
        <Columns columns={board.columns} />
      )}
      {/* <Sidebar boards={data.boards} currentBoard={board} /> */}
    </main>
  );
}

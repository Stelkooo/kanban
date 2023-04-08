import { TBoard } from '@/types/kanban.types';

import MoreOptions from '@/src/components/more-options/more-options.component';
import Heading from './components/heading/heading.component';
import AddTaskButton from './components/add-task-btn/add-task-btn.component';

type Props = {
  board: TBoard;
};

export default function Header({ board }: Props) {
  return (
    <header className="flex items-center justify-between px-4 py-5">
      <Heading name={board.name} />
      <div className="flex gap-4">
        <AddTaskButton board={board} />
        <MoreOptions optionsAbout="board" board={board} />
      </div>
    </header>
  );
}

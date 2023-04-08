import Image from 'next/image';

import { TBoard } from '@/types/kanban.types';

import AddTask from '@/public/assets/icon-add-task-mobile.svg';

import Button from '@/src/components/button/button.component';
import MoreOptions from '@/src/components/more-options/more-options.component';
import Heading from './components/heading/heading.component';

type Props = {
  board: TBoard;
};

export default function Header({ board }: Props) {
  return (
    <header className="flex items-center justify-between px-4 py-5">
      <Heading name={board.name} />
      <div className="flex gap-4">
        <Button
          btnStyle="primarySmall"
          isDisabled={!(board.columns.length > 0)}
        >
          <Image src={AddTask} alt="Click here to add a new task" />
        </Button>
        <MoreOptions optionsAbout="board" board={board} />
      </div>
    </header>
  );
}

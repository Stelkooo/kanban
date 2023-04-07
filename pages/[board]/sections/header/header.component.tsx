import Image from 'next/image';

import { TBoard } from '@/types/kanban.types';

import AddTask from '@/public/assets/icon-add-task-mobile.svg';
import ChevronDown from '@/public/assets/icon-chevron-down.svg';
import ChevronUp from '@/public/assets/icon-chevron-up.svg';

import Button from '../../components/button/button.component';
import MoreOptions from '../../components/more-options/more-options.component';

type Props = {
  board: TBoard;
};

export default function Header({ board }: Props) {
  return (
    <header className="flex items-center justify-between px-4 py-5">
      <Button btnStyle="clear">
        <h1 className="heading-large whitespace-nowrap text-black">
          {board.name}
        </h1>
        <Image src={ChevronDown} alt="" className="" />
      </Button>
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

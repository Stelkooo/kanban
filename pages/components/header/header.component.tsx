import Image from 'next/image';

import AddTask from '@/public/assets/icon-add-task-mobile.svg';
import VertEllipsis from '@/public/assets/icon-vertical-ellipsis.svg';

import Button from '../button/button.component';
import CurrentBoard from './components/current-board/current-board.component';
import AddTaskBtn from './components/add-task-btn/add-task-btn.component';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-5">
      <CurrentBoard />
      <div className="flex gap-4">
        <AddTaskBtn />
        <button type="button">
          <Image src={VertEllipsis} alt="Click here for more board options" />
        </button>
      </div>
    </header>
  );
}

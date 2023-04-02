import Image from 'next/image';

import Logo from '@/public/assets/logo-mobile.svg';
import ChevronDown from '@/public/assets/icon-chevron-down.svg';
import ChevronUp from '@/public/assets/icon-chevron-Up.svg';
import AddTask from '@/public/assets/icon-add-task-mobile.svg';
import VertEllipsis from '@/public/assets/icon-vertical-ellipsis.svg';

import Button from '../button/button.component';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-5">
      <div className="flex items-center gap-4">
        <div>
          <Image src={Logo} alt="Kanban Logo" />
        </div>
        <Button btnStyle="clear">
          <h1 className="whitespace-nowrap">Platform Launch</h1>
          <Image src={ChevronDown} alt="" className="" />
        </Button>
      </div>
      <div className="flex gap-4">
        <Button btnStyle="primarySmall" isDisabled>
          <Image src={AddTask} alt="Click here to add a new task" />
        </Button>
        <button type="button">
          <Image src={VertEllipsis} alt="Click here for more board options" />
        </button>
      </div>
    </header>
  );
}

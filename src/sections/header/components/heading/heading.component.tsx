'use client';

import Image from 'next/image';
import { useToggle } from 'usehooks-ts';

import Button from '@/src/components/button/button.component';

import ChevronDown from '@/public/assets/icon-chevron-down.svg';
import ChevronUp from '@/public/assets/icon-chevron-up.svg';
import SwitchBoards from '@/src/components/modal/components/switch-boards/switch-boards.component';

type Props = {
  name: string;
};

export default function Heading({ name }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useToggle(false);
  return (
    <>
      <Button btnStyle="clear" onClickFunc={() => setIsMenuOpen()}>
        <h1 className="heading-large whitespace-nowrap text-black">{name}</h1>
        <Image src={isMenuOpen ? ChevronUp : ChevronDown} alt="" className="" />
      </Button>
      {isMenuOpen && <SwitchBoards setIsMenuOpen={setIsMenuOpen} />}
    </>
  );
}

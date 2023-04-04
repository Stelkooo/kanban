'use client';

import Image from 'next/image';
import { useState } from 'react';

import { useAppSelector } from '@/store/hooks';
import { selectCurrentBoard } from '@/store/kanban/kanban.selector';

import ChevronDown from '@/public/assets/icon-chevron-down.svg';
import ChevronUp from '@/public/assets/icon-chevron-Up.svg';

import Button from '@/pages/components/button/button.component';
import SelectBoard from '@/pages/components/modal/components/select-board/select-board.component';

export default function CurrentBoard() {
  const currentBoard = useAppSelector(selectCurrentBoard);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Button btnStyle="clear" onClickFunc={() => toggleMenuHandler()}>
        <h1 className="heading-large whitespace-nowrap text-black">
          {currentBoard ? currentBoard.name : 'Loading...'}
        </h1>
        <Image src={isMenuOpen ? ChevronUp : ChevronDown} alt="" className="" />
      </Button>
      {isMenuOpen && <SelectBoard setIsMenuOpen={setIsMenuOpen} />}
    </>
  );
}

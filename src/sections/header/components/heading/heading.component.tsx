'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useToggle, useMediaQuery } from 'usehooks-ts';

import Button from '@/src/components/button/button.component';

import ChevronDown from '@/public/assets/icon-chevron-down.svg';
import ChevronUp from '@/public/assets/icon-chevron-up.svg';
import SwitchBoards from '@/src/components/modal/components/switch-boards/switch-boards.component';

type Props = {
  name: string;
};

export default function Heading({ name }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useToggle(false);
  const isTabletSize = useMediaQuery('(min-width: 768px)');
  const content = (
    <h1 className="heading-large whitespace-nowrap text-black dark:text-white">
      {name}
    </h1>
  );
  useEffect(() => {
    if (isTabletSize && isMenuOpen) setIsMenuOpen();
  }, [isTabletSize, setIsMenuOpen, isMenuOpen]);
  return (
    <>
      {!isTabletSize ? (
        <Button btnStyle="clear" onClickFunc={() => setIsMenuOpen()}>
          {content}
          <Image
            src={isMenuOpen ? ChevronUp : ChevronDown}
            alt=""
            className=""
          />
        </Button>
      ) : (
        content
      )}
      {isMenuOpen && <SwitchBoards setIsMenuOpen={setIsMenuOpen} />}
    </>
  );
}

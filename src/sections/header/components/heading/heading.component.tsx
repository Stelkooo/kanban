'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useToggle, useMediaQuery, useOnClickOutside } from 'usehooks-ts';

import Button from '@/src/components/button/button.component';

import ChevronDown from '@/public/assets/icon-chevron-down.svg';
import ChevronUp from '@/public/assets/icon-chevron-up.svg';
import SwitchBoards from '@/src/components/modal/components/switch-boards/switch-boards.component';

type Props = {
  name: string;
};

export default function Heading({ name }: Props) {
  const headingRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useToggle(false);
  const isTabletSize = useMediaQuery('(min-width: 768px)');

  const content = (
    <h1 className="heading-large whitespace-nowrap text-black dark:text-white">
      {name}
    </h1>
  );

  const onClickOutsideHandler = () => {
    if (isMenuOpen) setIsMenuOpen();
  };

  useOnClickOutside(headingRef, onClickOutsideHandler);

  useEffect(() => {
    if (isTabletSize && isMenuOpen) setIsMenuOpen();
  }, [isTabletSize, setIsMenuOpen, isMenuOpen]);
  return (
    <div ref={headingRef}>
      {!isTabletSize ? (
        <Button btnStyle="clear" onClickFunc={() => setIsMenuOpen()}>
          {content}
          <Image src={isMenuOpen ? ChevronUp : ChevronDown} alt="" />
        </Button>
      ) : (
        content
      )}
      {isMenuOpen && <SwitchBoards setIsMenuOpen={setIsMenuOpen} />}
    </div>
  );
}

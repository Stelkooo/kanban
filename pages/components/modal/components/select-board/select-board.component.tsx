'use client';

import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

import { useAppSelector } from '@/store/hooks';
import { selectBoards } from '@/store/kanban/kanban.selector';

import Sun from '@/public/assets/icon-light-theme.svg';
import Moon from '@/public/assets/icon-dark-theme.svg';

import Boards from './boards/boards.component';

type Props = {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export default function SelectBoard({ setIsMenuOpen }: Props) {
  const boards = useAppSelector(selectBoards);
  return (
    <>
      <div className="fixed inset-0 z-40 mt-[4.5rem] h-full w-full bg-black opacity-60" />
      <div className="fixed left-1/2 top-0 z-50 mt-[5.5rem] flex w-[264px] -translate-x-1/2 flex-col gap-4 rounded-lg bg-white py-4">
        <h2 className="heading-small px-6">All Boards ({boards.length})</h2>
        <Boards setIsMenuOpen={setIsMenuOpen} />
        <div className="mt-auto">
          <div className="mx-4 flex items-center justify-center gap-6 rounded-md bg-light-grey py-3.5">
            <Image src={Sun} alt="Light Theme Icon" />
            <label htmlFor="themeSwitcher" className="relative block h-5 w-10">
              <input
                type="checkbox"
                id="themeSwitcher"
                className="peer hidden"
              />
              <div className="absolute inset-0 cursor-pointer rounded-full bg-medium-grey transition-all before:absolute before:left-[3px] before:top-[3px] before:inline-block before:h-[14px] before:w-[14px] before:rounded-full before:bg-white before:transition-all peer-checked:bg-purple peer-checked:before:left-[23px]" />
            </label>
            <Image src={Moon} alt="Dark Theme Icon" />
          </div>
        </div>
      </div>
    </>
  );
}

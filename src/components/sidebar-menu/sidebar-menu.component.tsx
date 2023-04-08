'use client';

import Image from 'next/image';

import { boardApi } from '@/store/api/api.store';

import Sun from '@/public/assets/icon-light-theme.svg';
import Moon from '@/public/assets/icon-dark-theme.svg';

import BoardButton from '../board-button/board-button.component';
import Boards from '../boards/boards.component';

type Props = {
  setIsMenuOpen?: () => void;
};

export default function SideBarMenu({ setIsMenuOpen }: Props) {
  const { data } = boardApi.useGetAllQuery();
  return (
    <>
      <h2 className="heading-small px-6 md:pr-0">
        All Boards ({data?.length})
      </h2>
      {data && <Boards boards={data} setIsMenuOpen={setIsMenuOpen} />}
      <div className="mt-auto">
        <div className="mx-4 flex items-center justify-center gap-6 rounded-md bg-light-grey py-3.5 md:mr-0">
          <Image src={Sun} alt="Light Theme Icon" />
          <label htmlFor="themeSwitcher" className="relative block h-5 w-10">
            <input type="checkbox" id="themeSwitcher" className="peer hidden" />
            <div className="absolute inset-0 cursor-pointer rounded-full bg-medium-grey transition-all before:absolute before:left-[3px] before:top-[3px] before:inline-block before:h-[14px] before:w-[14px] before:rounded-full before:bg-white before:transition-all peer-checked:bg-purple peer-checked:before:left-[23px]" />
          </label>
          <Image src={Moon} alt="Dark Theme Icon" />
        </div>
        <div className="hidden">
          <BoardButton btnStyle="selected" text="Hide Sidebar" svg="hide" />
        </div>
      </div>
    </>
  );
}

SideBarMenu.defaultProps = {
  setIsMenuOpen: null,
};

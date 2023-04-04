import Image from 'next/image';

import Logo from '@/public/assets/logo-mobile.svg';
import Sun from '@/public/assets/icon-light-theme.svg';
import Moon from '@/public/assets/icon-dark-theme.svg';
import HideSidebar from '@/public/assets/icon-hide-sidebar.svg';

import { TBoard } from '@/pages/types/kanban.types';

import Boards from './components/boards.component';

type Props = {
  boards: TBoard[];
  currentBoard: TBoard;
};

export default function Sidebar({ boards, currentBoard }: Props) {
  return (
    <div className="flex w-max flex-col justify-center md:row-span-2 md:w-[260px] md:justify-start md:gap-[54px] md:border-b md:border-r md:border-lines-light md:pb-8 md:pt-7">
      <div className="pl-4 md:pl-3.5">
        <picture>
          <source
            media="(min-width:768px)"
            srcSet="/assets/logo-dark.svg"
            width={152}
          />
          <Image src={Logo} alt="Kanban Logo" />
        </picture>
      </div>
      {/* <div className="fixed inset-0 z-40 mt-[4.5rem] h-full w-full bg-black opacity-60" /> */}
      <div className="fixed left-1/2 z-50 hidden w-[264px] -translate-x-1/2 flex-col gap-4 rounded-lg bg-white py-4 md:static md:left-0 md:z-0 md:flex md:h-full md:w-60 md:-translate-x-0 md:justify-start md:gap-[18px] md:p-0">
        <h2 className="heading-small px-6 md:pr-0">
          All Boards ({boards.length})
        </h2>
        <Boards boards={boards} currentBoard={currentBoard} />
        <div className="mt-auto">
          <div className="mx-4 flex items-center justify-center gap-6 rounded-md bg-light-grey py-3.5 md:mr-0">
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
        <button
          type="button"
          className="ml-6 inline-flex items-center gap-[10px] py-4"
        >
          <Image src={HideSidebar} alt="" />
          <p className="heading-medium text-medium-grey">Hide Sidebar</p>
        </button>
      </div>
    </div>
  );
}

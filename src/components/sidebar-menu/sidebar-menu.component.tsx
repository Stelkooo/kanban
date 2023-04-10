'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';

import { useAppDispatch } from '@/store/hooks';
import { setSidebarToggle } from '@/store/sidebar/sidebar.reducer';

import { boardApi } from '@/store/api/api.store';

import Sun from '@/public/assets/icon-light-theme.svg';
import Moon from '@/public/assets/icon-dark-theme.svg';

import BoardButton from '../board-button/board-button.component';
import Boards from '../boards/boards.component';

type Props = {
  setIsMenuOpen?: () => void;
};

export default function SideBarMenu({ setIsMenuOpen }: Props) {
  const dispatch = useAppDispatch();
  const { data } = boardApi.useGetAllQuery();

  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const onChangeHandler = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };
  return (
    <>
      <h2 className="heading-small px-6">All Boards ({data?.length})</h2>
      {data && <Boards boards={data} setIsMenuOpen={setIsMenuOpen} />}
      <div className="md:mt-auto">
        <div className="mx-4 flex items-center justify-center gap-6 rounded-md bg-light-grey py-3.5 dark:bg-very-dark-grey md:mr-0">
          <Image src={Sun} alt="Light Theme Icon" />
          <label htmlFor="themeSwitcher" className="relative block h-5 w-10">
            <input
              type="checkbox"
              id="themeSwitcher"
              className="peer/input sr-only"
              defaultChecked={currentTheme === 'dark'}
              onChange={() => onChangeHandler()}
            />
            <div className="absolute inset-0 cursor-pointer rounded-full bg-medium-grey transition-all before:absolute before:left-[3px] before:top-[3px] before:inline-block before:h-[14px] before:w-[14px] before:rounded-full before:bg-white before:transition-all peer-checked/input:bg-purple peer-checked/input:before:left-[23px]" />
          </label>
          <Image src={Moon} alt="Dark Theme Icon" />
        </div>
        <div className="hidden md:block">
          <BoardButton
            btnStyle="default"
            text="Hide Sidebar"
            svg="hide"
            onClickFunc={() => dispatch(setSidebarToggle())}
          />
        </div>
      </div>
    </>
  );
}

SideBarMenu.defaultProps = {
  setIsMenuOpen: null,
};

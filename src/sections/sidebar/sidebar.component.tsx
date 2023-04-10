'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { useTheme } from 'next-themes';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSidebarToggle } from '@/store/sidebar/sidebar.reducer';
import selectIsSidebarOpen from '@/store/sidebar/sidebar.selector';

import Logo from '@/public/assets/logo-mobile.svg';
import SideBarMenu from '@/src/components/sidebar-menu/sidebar-menu.component';

export default function Sidebar() {
  const dispatch = useAppDispatch();

  const isMenuOpen = useAppSelector(selectIsSidebarOpen);

  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const isTabletSize = useMediaQuery('(min-width: 768px)');
  useEffect(() => {
    if (!isTabletSize && isMenuOpen) dispatch(setSidebarToggle());
  }, [isTabletSize, isMenuOpen, dispatch]);
  return (
    <div
      className={`${
        isMenuOpen ? 'md:row-span-2 md:w-[260px] md:pb-8' : 'md:row-span-1'
      } flex w-max flex-col justify-center dark:bg-dark-grey md:justify-start md:gap-[54px] md:border-b md:border-r md:border-lines-light md:pr-5 md:pt-5 dark:md:border-lines-dark`}
    >
      <div className="pl-4 md:pl-3.5">
        <picture>
          <source
            media="(min-width:768px)"
            srcSet={`/assets/logo-${
              currentTheme === 'dark' ? 'light' : 'dark'
            }.svg`}
            width={152}
          />
          <Image src={Logo} alt="Kanban Logo" />
        </picture>
      </div>
      <div
        className={`${isMenuOpen ? 'flex' : 'hidden'} h-full flex-col gap-5`}
      >
        <SideBarMenu />
      </div>
      <button
        type="button"
        className={`absolute bottom-8 z-50 hidden rounded-r-full bg-purple p-4.5 ${
          isMenuOpen ? 'md:hidden' : 'md:block'
        }`}
        onClick={() => dispatch(setSidebarToggle())}
      >
        <svg width="16" height="11" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.815 4.434A9.055 9.055 0 0 0 8 0 9.055 9.055 0 0 0 .185 4.434a1.333 1.333 0 0 0 0 1.354A9.055 9.055 0 0 0 8 10.222c3.33 0 6.25-1.777 7.815-4.434a1.333 1.333 0 0 0 0-1.354ZM8 8.89A3.776 3.776 0 0 1 4.222 5.11 3.776 3.776 0 0 1 8 1.333a3.776 3.776 0 0 1 3.778 3.778A3.776 3.776 0 0 1 8 8.89Zm2.889-3.778a2.889 2.889 0 1 1-5.438-1.36 1.19 1.19 0 1 0 1.19-1.189H6.64a2.889 2.889 0 0 1 4.25 2.549Z"
            fill="#FFF"
          />
        </svg>
      </button>
    </div>
  );
}

'use client';

import SideBarMenu from '@/src/components/sidebar-menu/sidebar-menu.component';
import BackDrop from '../backdrop/backdrop.component';

type Props = {
  setIsMenuOpen: () => void;
};

export default function SwitchBoards({ setIsMenuOpen }: Props) {
  return (
    <>
      <BackDrop marginTop="mt-[4.5rem]" onClickFunc={setIsMenuOpen} />
      <div className="fixed left-1/2 top-[5.5rem] z-50 grid w-[264px] -translate-x-1/2 gap-y-4 rounded-lg bg-white py-4">
        <SideBarMenu setIsMenuOpen={setIsMenuOpen} />
      </div>
    </>
  );
}

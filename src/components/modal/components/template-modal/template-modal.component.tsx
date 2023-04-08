'use client';

import { useAppDispatch } from '@/store/hooks';
import { setModalToggle } from '@/store/modal/modal.reducer';
import BackDrop from '../backdrop/backdrop.component';

type Props = {
  children: JSX.Element | JSX.Element[];
  heading: string;
};

export default function TemplateModal({ children, heading }: Props) {
  const dispatch = useAppDispatch();
  return (
    <>
      <BackDrop onClickFunc={() => dispatch(setModalToggle())} />
      <div className="fixed left-1/2 top-1/2 z-50 flex w-[343px] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-md bg-white p-6">
        <h3 className="heading-large capitalize">{heading}</h3>
        {children}
      </div>
    </>
  );
}

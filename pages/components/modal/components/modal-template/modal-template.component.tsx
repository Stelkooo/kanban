'use client';

import { useRef, useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setModalToggle } from '@/store/modal/modal.reducer';

type Props = {
  children: JSX.Element[];
};

export default function ModalTemplate({ children }: Props) {
  const dispatch = useAppDispatch();
  const backdrop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hideModalHander = () => {
      dispatch(setModalToggle());
    };
    const el = backdrop.current;
    el?.addEventListener('click', hideModalHander);

    return () => {
      el?.removeEventListener('click', hideModalHander);
    };
  }, [dispatch]);

  return (
    <>
      <div
        className="fixed inset-0 z-40 h-full w-full bg-black opacity-60"
        ref={backdrop}
      />
      <div className="fixed left-1/2 top-1/2 z-50 flex w-[343px] -translate-x-1/2 -translate-y-1/2 flex-col gap-6 rounded-md bg-white p-6">
        {children}
      </div>
    </>
  );
}

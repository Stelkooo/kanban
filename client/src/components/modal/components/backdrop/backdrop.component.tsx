'use client';

import { useEffect, useRef } from 'react';

type Props = {
  marginTop?: string;
  onClickFunc?: () => void;
};

export default function BackDrop({ marginTop, onClickFunc }: Props) {
  const backdrop = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = backdrop.current;
    if (onClickFunc) el?.addEventListener('click', onClickFunc);

    return () => {
      if (onClickFunc) el?.removeEventListener('click', onClickFunc);
    };
  }, [onClickFunc]);
  return (
    <div
      className={`${marginTop} fixed inset-0 z-40 h-full w-full bg-black opacity-60`}
      ref={backdrop}
    />
  );
}

BackDrop.defaultProps = {
  marginTop: '',
  onClickFunc: undefined,
};

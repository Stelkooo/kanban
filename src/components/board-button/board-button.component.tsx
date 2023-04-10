'use client';

import React from 'react';

type TBtnStyle = 'selected' | 'default' | 'create';

type Props = {
  text: string;
  btnStyle: TBtnStyle;
  svg: 'board' | 'hide';
  onClickFunc?: () => void;
};

export default function BoardButton({
  text,
  btnStyle,
  svg,
  onClickFunc,
}: Props) {
  const getColor = (style: TBtnStyle, el: 'fill' | 'text') => {
    switch (style) {
      case 'selected':
        return `${el}-white`;
      case 'create':
        return `${el}-purple`;
      default:
        return `${el}-medium-grey`;
    }
  };
  return (
    <button
      type="button"
      className={`${
        btnStyle === 'selected' ? 'bg-purple' : ''
      } flex w-full cursor-pointer items-center gap-3 rounded-r-full py-[15px] pl-6`}
      onClick={onClickFunc}
    >
      {svg === 'hide' ? (
        <svg
          width="18"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          className={`relative ${getColor(btnStyle, 'fill')}`}
        >
          <path d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z" />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          className={`relative ${getColor(btnStyle, 'fill')}`}
        >
          <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
        </svg>
      )}
      <p className={`heading-medium relative ${getColor(btnStyle, 'text')}`}>
        {text}
      </p>
    </button>
  );
}

BoardButton.defaultProps = {
  onClickFunc: null,
};

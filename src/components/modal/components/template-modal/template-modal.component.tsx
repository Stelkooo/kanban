'use client';

import { useAppDispatch } from '@/store/hooks';
import { setModalToggle } from '@/store/modal/modal.reducer';

import MoreOptions from '@/src/components/more-options/more-options.component';
import BackDrop from '../backdrop/backdrop.component';

type Props = {
  children: JSX.Element | JSX.Element[];
  heading: string;
  showMoreOptions?: boolean;
  isDanger?: boolean;
};

export default function TemplateModal({
  children,
  heading,
  showMoreOptions,
  isDanger,
}: Props) {
  const dispatch = useAppDispatch();
  return (
    <>
      <BackDrop onClickFunc={() => dispatch(setModalToggle())} />
      <div className="fixed left-1/2 top-1/2 z-50 flex w-[343px] -translate-x-1/2  -translate-y-1/2 flex-col gap-6 rounded-md bg-white p-6 dark:bg-dark-grey md:w-[480px]">
        <div className="flex justify-between gap-4">
          <h3
            className={`heading-large ${
              isDanger ? 'text-red' : 'text-black dark:text-white'
            }`}
          >
            {heading}
          </h3>
          {showMoreOptions && <MoreOptions optionsAbout="task" />}
        </div>
        {children}
      </div>
    </>
  );
}

TemplateModal.defaultProps = {
  showMoreOptions: false,
  isDanger: false,
};

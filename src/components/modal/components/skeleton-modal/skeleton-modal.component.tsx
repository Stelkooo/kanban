'use client';

import BackDrop from '../backdrop/backdrop.component';

export default function SkeletonModal() {
  return (
    <>
      <BackDrop />
      <div className="fixed left-1/2 top-1/2 z-50 flex w-[343px] -translate-x-1/2 -translate-y-1/2 animate-fade-in animate-pulse flex-col gap-6 rounded-md bg-white p-6 dark:bg-dark-grey md:w-[480px]">
        <div className="grid gap-2">
          <div className="h-5 w-52 rounded-full bg-medium-grey" />
          <div className="h-5 w-56 rounded-full bg-medium-grey" />
          <div className="h-5 w-52 rounded-full bg-medium-grey" />
        </div>
        <div className="grid gap-2">
          <div className="h-3 w-10/12 rounded-full bg-medium-grey" />
          <div className="h-3 w-11/12 rounded-full bg-medium-grey" />
          <div className="h-3 w-10/12 rounded-full bg-medium-grey" />
          <div className="h-3 w-11/12 rounded-full bg-medium-grey" />
        </div>
        <div className="grid gap-2">
          <div className="h-3 w-4/12 rounded-full bg-medium-grey" />
          <div className="h-8 w-full rounded-full bg-medium-grey" />
          <div className="h-8 w-full rounded-full bg-medium-grey" />
        </div>
        <div className="grid gap-2">
          <div className="h-3 w-4/12 rounded-full bg-medium-grey" />
          <div className="h-8 w-full rounded-full bg-medium-grey" />
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
}

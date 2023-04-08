'use client';

import { useRouter } from 'next/router';

import { useAppSelector } from '@/store/hooks';
import { selectIsModalOpen } from '@/store/modal/modal.selector';

import _ from 'lodash';

import { boardApi } from '@/store/api/api.store';

import Button from '@/src/components/button/button.component';
import Modal from '@/src/components/modal/modal.component';
import Columns from './components/columns/columns.component';

export default function Main() {
  const router = useRouter();
  const { data } = boardApi.endpoints.getBoard.useQueryState(
    router.query.board as string
  );

  const isModalOpen = useAppSelector(selectIsModalOpen);
  return (
    <main className="relative col-span-2 flex gap-6 overflow-auto bg-light-grey px-4 py-6 md:col-span-1">
      {_.isEmpty(data) ? (
        <div className="absolute top-1/2 -translate-y-1/2 px-4 text-center">
          <h2 className="heading-large mb-6 text-medium-grey">
            This board is empty. Create a new column to get started.
          </h2>
          <Button btnStyle="primaryLarge">
            <p className="heading-medium">Add New Column</p>
          </Button>
        </div>
      ) : (
        <Columns columns={data.columns} />
      )}
      {isModalOpen && <Modal />}
    </main>
  );
}

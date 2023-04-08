'use client';

import { Dispatch, SetStateAction } from 'react';

import Button from '@/src/components/button/button.component';
import TemplateModal from '../template-modal/template-modal.component';
import AddEditList, {
  TListObj,
} from '../add-edit-list/add-edit-list.component';

type Props = {
  addOrEdit: 'add' | 'edit';
  nameObj: { name: string; setName: Dispatch<SetStateAction<string>> };
  listObj: TListObj;
  isLoading: boolean;
  onClickFunc: () => void;
};

export default function BoardModal({
  addOrEdit,
  nameObj,
  listObj,
  isLoading,
  onClickFunc,
}: Props) {
  return (
    <TemplateModal
      heading={`${addOrEdit === 'add' ? 'Add New' : 'Edit'} Board`}
    >
      <label htmlFor="name" className="grid gap-y-2">
        <p className="body-medium text-medium-grey">Name</p>
        <input
          type="text"
          id="name"
          className="body-large rounded-[4px] border border-lines-light px-4 py-2"
          placeholder="e.g. Take coffee break"
          defaultValue={nameObj.name}
          onChange={(e) => nameObj.setName(e.currentTarget.value)}
        />
      </label>
      <AddEditList listObj={listObj} />
      <Button
        btnStyle="primarySmall"
        onClickFunc={() => onClickFunc()}
        isDisabled={isLoading}
        isLoading={isLoading}
      >
        <p className="body-medium">
          {addOrEdit === 'add' ? 'Create New Board' : 'Save Changes'}
        </p>
      </Button>
    </TemplateModal>
  );
}

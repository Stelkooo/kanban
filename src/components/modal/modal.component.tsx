'use client';

import { useAppSelector } from '@/store/hooks';
import {
  selectModalType,
  selectBoard,
  selectTask,
} from '@/store/modal/modal.selector';

import ViewTask from './components/view-task/view-task.component';
import AddTask from './components/add-task/add-task.component';
import EditTask from './components/edit-task/edit-task.component';
import TemplateModal from './components/template-modal/template-modal.component';
import AddBoard from './components/add-board/add-board.component';
import EditBoard from './components/edit-board/edit-board.component';
import DeleteBoard from './components/delete-board/delete-board.component';
import DeleteTask from './components/delete-task/delete-task.component';

export default function Modal() {
  const modalType = useAppSelector(selectModalType);
  const board = useAppSelector(selectBoard);
  const task = useAppSelector(selectTask);

  switch (modalType) {
    // case 'view-task':
    //   return <ViewTask />;
    case 'add-task':
      return board && <AddTask board={board} />;
    // case 'edit-task':
    //   return <EditTask />;
    case 'add-board':
      return <AddBoard />;
    case 'edit-board':
      return board && <EditBoard board={board} />;
    // case 'delete-board':
    //   return board && <DeleteBoard board={board} />;
    // case 'delete-task':
    //   return <DeleteTask />;
    default:
      return (
        <TemplateModal heading="Modal does not exist :/">
          <p>How did you manage this then?</p>
        </TemplateModal>
      );
  }
}

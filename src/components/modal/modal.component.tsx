'use client';

import { useAppSelector } from '@/store/hooks';
import {
  selectModalType,
  selectTask,
  selectBoard,
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

  if (modalType === 'view-task' && task) return <ViewTask taskId={task} />;
  if (modalType === 'edit-task' && task) return <EditTask taskId={task} />;
  if (modalType === 'add-task' && board) return <AddTask board={board} />;
  if (modalType === 'add-board') return <AddBoard />;
  if (modalType === 'edit-board' && board) return <EditBoard board={board} />;
  if (modalType === 'delete-board' && board)
    return <DeleteBoard board={board} />;
  if (modalType === 'delete-task' && task) return <DeleteTask taskId={task} />;
  return (
    <TemplateModal heading="Modal does not exist :/">
      <p>How did you manage this then?</p>
    </TemplateModal>
  );
}

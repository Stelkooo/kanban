'use client';

import { useAppSelector } from '@/store/hooks';
import { selectModalType, selectTask } from '@/store/modal/modal.selector';
import { selectCurrentBoard } from '@/store/kanban/kanban.selector';

import ViewTask from './components/view-task/view-task.component';
import AddTask from './components/add-task/add-task.component';
import EditTask from './components/edit-task/edit-task.component';
import ModalTemplate from './components/modal-template/modal-template.component';
import AddBoard from './components/add-board/add-board.component';
import EditBoard from './components/edit-board/edit-board.component';

export default function Modal() {
  const modalType = useAppSelector(selectModalType);
  const task = useAppSelector(selectTask);
  const board = useAppSelector(selectCurrentBoard);

  if (modalType === 'view-task' && task) return <ViewTask task={task} />;
  if (modalType === 'add-task') return <AddTask />;
  if (modalType === 'edit-task' && task) return <EditTask task={task} />;
  if (modalType === 'add-board') return <AddBoard />;
  if (modalType === 'edit-board' && board) return <EditBoard board={board} />;
  return (
    <ModalTemplate>
      <p>Modal does not exist :/</p>
      <p>How did you manage this then?</p>
    </ModalTemplate>
  );
}

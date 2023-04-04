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
import DeleteBoard from './components/delete-board/delete-board.component';
import DeleteTask from './components/delete-task/delete-task.component';

export default function Modal() {
  const modalType = useAppSelector(selectModalType);
  const task = useAppSelector(selectTask);
  const board = useAppSelector(selectCurrentBoard);

  switch (modalType) {
    case 'view-task':
      return task && <ViewTask task={task} />;
    case 'add-task':
      return <AddTask />;
    case 'edit-task':
      return task && <EditTask task={task} />;
    case 'add-board':
      return <AddBoard />;
    case 'edit-board':
      return board && <EditBoard board={board} />;
    case 'delete-board':
      return board && <DeleteBoard board={board} />;
    case 'delete-task':
      return task && <DeleteTask task={task} />;
    default:
      return (
        <ModalTemplate>
          <p>Modal does not exist :/</p>
          <p>How did you manage this then?</p>
        </ModalTemplate>
      );
  }
}

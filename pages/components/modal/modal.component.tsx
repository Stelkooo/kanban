'use client';

import { useAppSelector } from '@/store/hooks';
import {
  selectModalType,
  selectTask,
  selectBoard,
} from '@/store/modal/modal.selector';
import ViewTask from './components/view-task/view-task.component';
import AddTask from './components/add-task/add-task.component';

export default function Modal() {
  const modalType = useAppSelector(selectModalType);
  const task = useAppSelector(selectTask);
  const board = useAppSelector(selectBoard);

  if (modalType === 'view-task' && task) return <ViewTask task={task} />;
  if (modalType === 'add-task') return <AddTask />;
  return <h1>Modal</h1>;
}

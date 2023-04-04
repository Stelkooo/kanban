import CurrentBoard from './components/current-board/current-board.component';
import AddTaskBtn from './components/add-task-btn/add-task-btn.component';
import MoreOptions from '../more-options/more-options.component';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-5">
      <CurrentBoard />
      <div className="flex gap-4">
        <AddTaskBtn />
        <MoreOptions optionsAbout="board" />
      </div>
    </header>
  );
}

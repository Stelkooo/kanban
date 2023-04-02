import Task from '../task/task.component';

export default function Columns() {
  return (
    <div className="min-w-[280px]">
      <h2 className="heading-small mb-6 flex uppercase text-medium-grey before:mr-3 before:inline-block before:h-4 before:w-4 before:rounded-full before:bg-purple">
        Todo (4)
      </h2>
      <div className="grid gap-y-5">
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
    </div>
  );
}

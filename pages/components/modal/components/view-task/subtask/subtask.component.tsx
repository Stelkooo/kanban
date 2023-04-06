import { TSubtask } from '@/types/kanban.types';

type Props = {
  subtask: TSubtask;
};

export default function SubTask({ subtask }: Props) {
  return (
    <label
      htmlFor={subtask.id}
      className="flex cursor-pointer items-center gap-4 rounded-[4px] bg-light-grey p-3"
    >
      <input
        type="checkbox"
        defaultChecked={subtask.isCompleted}
        id={subtask.id}
        className="peer sr-only"
      />
      <span className="h-4 w-4 rounded-sm border border-medium-grey bg-white after:h-full after:w-full after:bg-[url('/assets/icon-check.svg')] after:bg-center after:bg-no-repeat peer-checked:border-none peer-checked:bg-purple peer-checked:after:block" />
      <p className="body-medium peer-checked:text-medium-grey peer-checked:line-through">
        {subtask.title}
      </p>
    </label>
  );
}

export type TBoard = {
  _id?: string;
  name?: string;
  columns?: TColumn[];
};

export type TColumn = {
  _id?: string;
  order?: string[];
  name?: string;
  tasks?: TTask[];
  board?: TBoard;
};

export type TTask = {
  _id?: string;
  title?: string;
  description?: string;
  subtasks?: TSubtask[];
  column?: TColumn;
};

export type TSubtask = {
  _id?: string;
  title?: string;
  isCompleted?: boolean;
  task?: TTask;
};

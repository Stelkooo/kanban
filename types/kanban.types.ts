export type TBoard = {
  id: number;
  order: number[];
  name: string;
  columns: TColumn[];
};

export type TColumn = {
  id: number;
  order: number[];
  name: string;
  tasks: TTask[];
};

export type TTask = {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: TSubtask[];
};

export type TSubtask = {
  id: string;
  title: string;
  isCompleted: boolean;
};

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
  id: number;
  title: string;
  description: string | null;
  status: string;
  subtasks: TSubtask[];
};

export type TSubtask = {
  id: number;
  title: string;
  isCompleted: boolean;
};

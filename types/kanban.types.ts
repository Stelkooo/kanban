export type TBoard = {
  id: string;
  name: string;
  columns: TColumn[];
};

export type TColumn = {
  id?: string;
  order?: string[];
  name?: string;
  tasks?: TTask[];
  board?: { id: string };
};

export type TTask = {
  id: string;
  title: string;
  description: string | null;
  subtasks: TSubtask[];
  column: { id: string };
};

export type TSubtask = {
  id: string;
  title: string;
  isCompleted: boolean;
  task: { id: string; column: { id: string } };
};

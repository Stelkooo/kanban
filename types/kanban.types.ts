export type TBoard = {
  id: string;
  name: string;
  columns?: TColumn[];
};

export type TColumn = {
  id: string;
  order?: string[];
  name?: string;
  tasks?: TTask[];
  board?: {
    id: string;
  };
};

export type TTask = {
  id: string;
  column?: {
    id: string;
  };
  title?: string;
  description?: string | null;
  subtasks?: TSubtask[];
};

export type TSubtask = {
  id: string;
  isCompleted?: boolean;
  title?: string;
  task?: {
    id: string;
  };
};

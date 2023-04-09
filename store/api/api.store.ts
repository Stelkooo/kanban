import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TBoard, TColumn, TSubtask, TTask } from '@/types/kanban.types';

export const boardApi = createApi({
  reducerPath: 'boardApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'api' }),
  tagTypes: ['Boards'],
  endpoints: (builder) => ({
    getAll: builder.query<TBoard[], void>({
      query: () => 'boards',
      providesTags: [{ type: 'Boards', id: 'LIST' }],
    }),
    getBoard: builder.query<TBoard, string>({
      query: (id) => {
        return {
          url: `board?id=${id}`,
          method: 'GET',
        };
      },
      providesTags: [{ type: 'Boards', id: 'LIST' }],
    }),
    createBoard: builder.mutation<Partial<TBoard>, Partial<TBoard>>({
      query: (board) => {
        return {
          url: 'board',
          method: 'POST',
          body: board,
        };
      },
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),
    updateBoard: builder.mutation<TBoard, TBoard>({
      query: (board) => {
        return {
          url: `board?id=${board.id}`,
          method: 'PATCH',
          body: board,
        };
      },
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),
    updateBoardColumns: builder.mutation<
      void,
      {
        boardId: string;
        createdColumns: Array<Partial<TColumn>>;
        updatedColumns: Array<Partial<TColumn>>;
        deletedColumns: TColumn[];
      }
    >({
      query: ({ boardId, createdColumns, updatedColumns, deletedColumns }) => {
        return {
          url: 'columns',
          method: 'POST',
          body: {
            boardId,
            createdColumns,
            updatedColumns,
            deletedColumns,
          },
        };
      },
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),
    createTask: builder.mutation<void, Partial<TTask>>({
      query: (task) => {
        return {
          url: 'task',
          method: 'POST',
          body: task,
        };
      },
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),
    updateTask: builder.mutation<
      void,
      { task: Partial<TTask>; newColumnId: string }
    >({
      query: ({ task, newColumnId }) => {
        return {
          url: 'task',
          method: 'PATCH',
          body: { task, newColumnId },
        };
      },
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),
    updateTaskStatus: builder.mutation<
      void,
      { task: TTask; newColumnId: string }
    >({
      query: ({ task, newColumnId }) => {
        return {
          url: 'task-status',
          method: 'PATCH',
          body: { task, newColumnId },
        };
      },
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),
    updateSubtask: builder.mutation<void, TSubtask>({
      query: (subtask) => {
        return {
          url: 'subtask',
          method: 'PATCH',
          body: subtask,
        };
      },
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),
  }),
});

export const boardApiReducer = boardApi.reducer;

export const boardApiMiddleware = boardApi.middleware;

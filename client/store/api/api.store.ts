import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TBoard, TColumn, TSubtask, TTask } from '@/types/kanban.types';

export const boardApi = createApi({
  reducerPath: 'boardApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'api' }),
  tagTypes: ['Boards', 'Board'],
  endpoints: (builder) => ({
    getAll: builder.query<Array<Partial<TBoard>>, void>({
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
      providesTags: (result) => [{ type: 'Board', id: result?.id }],
    }),
    createBoard: builder.mutation<Partial<TBoard>, Partial<TBoard>>({
      query: (board) => {
        return {
          url: 'board',
          method: 'POST',
          body: board,
        };
      },
      invalidatesTags: [{ type: 'Boards' }],
    }),
    updateBoard: builder.mutation<void, TBoard>({
      query: (board) => {
        return {
          url: `board?id=${board.id}`,
          method: 'PATCH',
          body: board,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Board', id: arg.id },
        { type: 'Boards' },
      ],
    }),
    deleteBoard: builder.mutation<void, TBoard>({
      query: (board) => {
        return {
          url: 'board',
          method: 'DELETE',
          body: board,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Boards' },
        { type: 'Board', id: arg.id },
      ],
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
      invalidatesTags: (result, error, arg) => [
        { type: 'Board', id: arg.boardId },
      ],
    }),
    createTask: builder.mutation<void, Partial<TTask>>({
      query: (task) => {
        return {
          url: 'task',
          method: 'POST',
          body: task,
        };
      },
      invalidatesTags: [{ type: 'Board' }],
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
      invalidatesTags: [{ type: 'Board' }],
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
      invalidatesTags: [{ type: 'Board' }],
    }),
    deleteTask: builder.mutation<void, TTask>({
      query: (task) => {
        return {
          url: 'task',
          method: 'DELETE',
          body: task,
        };
      },
      invalidatesTags: [{ type: 'Board' }],
    }),
    updateSubtask: builder.mutation<void, TSubtask>({
      query: (subtask) => {
        return {
          url: 'subtask',
          method: 'PATCH',
          body: subtask,
        };
      },
      invalidatesTags: [{ type: 'Board' }],
    }),
  }),
});

export const boardApiReducer = boardApi.reducer;

export const boardApiMiddleware = boardApi.middleware;

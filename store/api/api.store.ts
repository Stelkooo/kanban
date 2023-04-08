import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TBoard, TColumn } from '@/types/kanban.types';

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
    createBoard: builder.mutation<string, string>({
      query: (name) => {
        return {
          url: 'board',
          method: 'POST',
          body: name,
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
  }),
});

export const boardApiReducer = boardApi.reducer;

export const boardApiMiddleware = boardApi.middleware;

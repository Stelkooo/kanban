import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TBoard } from '@/types/kanban.types';

export const boardApi = createApi({
  reducerPath: 'boardApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'api' }),
  tagTypes: ['Boards', 'Board'],
  endpoints: (builder) => ({
    getAll: builder.query<TBoard[], void>({
      query: () => 'boards',
      providesTags: [{ type: 'Boards', id: 'LIST' }],
    }),
    getBoard: builder.query<TBoard, string>({
      query: (id) => `board?id=${id}`,
      providesTags: [{ type: 'Board' }],
    }),
  }),
});

export const boardApiReducer = boardApi.reducer;

export const boardApiMiddleware = boardApi.middleware;
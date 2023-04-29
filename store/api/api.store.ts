import { createApi } from '@reduxjs/toolkit/query/react';
import request, { ClientError, gql } from 'graphql-request';
import { TBoard, TColumn, TSubtask, TTask } from '@/types/kanban.types';

const graphqlBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({ body }: { body: string }) => {
    try {
      const result = await request(baseUrl, body);
      return { data: result };
    } catch (error) {
      if (error instanceof ClientError) {
        return { error: { status: error.response.status, data: error } };
      }
      return { error: { status: 500, data: error } };
    }
  };

export const boardApi = createApi({
  reducerPath: 'boardApi',
  baseQuery: graphqlBaseQuery({
    baseUrl: 'https://kanban-api-production-eaac.up.railway.app/graphql',
  }),
  tagTypes: ['Boards', 'Board', 'Task'],
  endpoints: (builder) => ({
    getBoards: builder.query<Array<TBoard>, void>({
      query: () => ({
        url: '',
        body: gql`
          {
            boards {
              _id
              name
            }
          }
        `,
        method: 'POST',
      }),
      providesTags: [{ type: 'Boards', id: 'LIST' }],
      transformResponse: (response: { boards: Array<TBoard> }) =>
        response.boards,
    }),
    getBoard: builder.query<TBoard, string>({
      query: (id) => ({
        url: '',
        body: gql`
          {
            board(id: "${id}") {
              _id
              name
              columns {
                _id
                name
                board {
                  _id
                }
                tasks {
                  _id
                  title
                  description
                  column {
                    _id
                  }
                  subtasks {
                    _id
                    title
                    isCompleted
                    task {
                      _id
                    }
                  }
                }
              }
            }
          }
        `,
        method: 'POST',
      }),
      providesTags: (result, error, arg) => [{ type: 'Board', id: arg }],
      transformResponse: (response: { board: TBoard }) => response.board,
    }),
    createBoard: builder.mutation<TBoard, string>({
      query: (name) => ({
        url: '',
        body: gql`
          mutation {
            createBoard(name: "${name}") {
              _id
            }
          }
        `,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
      transformResponse: (response: { createBoard: TBoard }) =>
        response.createBoard,
    }),
    updateBoard: builder.mutation<TBoard, TBoard>({
      query: ({ _id, name }) => ({
        url: '',
        body: gql`
          mutation {
            updateBoard(id: "${_id}", name: "${name}") {
              _id
            }
          }
        `,
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Board', id: arg._id },
        { type: 'Boards', id: 'LIST' },
      ],
      transformResponse: (response: { updateBoard: TBoard }) =>
        response.updateBoard,
    }),
    deleteBoard: builder.mutation<TBoard, string>({
      query: (id) => ({
        url: '',
        body: gql`
          mutation {
            deleteBoard(id: "${id}") {
              _id
            }
          }
        `,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
      transformResponse: (response: { deleteBoard: TBoard }) =>
        response.deleteBoard,
    }),
    createColumn: builder.mutation<void, TColumn>({
      query: ({ board, name }) => ({
        url: '',
        body: gql`
          mutation {
            createColumn(board: "${board?._id}", name: "${name}") {
              _id
            }
          }
        `,
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Board', id: arg.board?._id },
      ],
    }),
    updateColumn: builder.mutation<void, TColumn>({
      query: ({ _id, name }) => ({
        url: '',
        body: gql`
          mutation {
            updateColumn(id: "${_id}", name: "${name}") {
              _id
            }
          }
        `,
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Board', id: arg.board?._id },
      ],
    }),
    deleteColumn: builder.mutation<void, TColumn>({
      query: ({ _id }) => ({
        url: '',
        body: gql`
          mutation {
            deleteColumn(id: "${_id}") {
              _id
            }
          }
        `,
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Board', id: arg.board?._id },
      ],
    }),
    getTask: builder.query<TTask, string>({
      query: (id) => ({
        url: '',
        body: gql`
          {
            task(id: "${id}") {
              _id
              title
              description
              column {
                _id
                board {
                  _id
                }
              }
              subtasks {
                _id
                title
                isCompleted
                task {
                  _id
                }
              }
            }
          }
        `,
        method: 'POST',
      }),
      providesTags: (result, error, arg) => [{ type: 'Task', id: arg }],
      transformResponse: (response: { task: TTask }) => response.task,
    }),
    createTask: builder.mutation<TTask, TTask>({
      query: ({ title, description, column, subtasks }) => ({
        url: '',
        body: gql`
          mutation {
            createTask(title: "${title}", description: "${description}", column: "${
          column?._id
        }", subtasks: [${subtasks?.map(
          (subtask) => `{title: "${subtask.title}"}`
        )}]) {
              _id
            }
          }
        `,
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Board', id: arg.column?.board?._id },
      ],
    }),
    updateTask: builder.mutation<TTask, TTask>({
      query: ({ _id, title, description, column }) => ({
        url: '',
        body: gql`
          mutation {
            updateTask(id: "${_id}", title: "${title}", description: "${description}", column: "${column?._id}") {
              _id
            }
          }
        `,
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Board', id: arg.column?.board?._id },
        { type: 'Task', id: arg._id },
      ],
    }),
    deleteTask: builder.mutation<TTask, TTask>({
      query: ({ _id }) => ({
        url: '',
        body: gql`
          mutation {
            deleteTask(id: "${_id}") {
              _id
            }
          }
        `,
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Board', id: arg.column?.board?._id },
      ],
    }),
    createSubtask: builder.mutation<TSubtask, TSubtask>({
      query: ({ title, task }) => ({
        url: '',
        body: gql`
          mutation {
            createSubtask(title: "${title}", task: "${task?._id}") {
              _id
            }
          }
        `,
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Board', id: arg.task?.column?.board?._id },
        { type: 'Task', id: arg.task?._id },
      ],
    }),
    updateSubtask: builder.mutation<TSubtask, TSubtask>({
      query: ({ _id, title, isCompleted }) => ({
        url: '',
        body: gql`
          mutation {
            updateSubtask(id: "${_id}", title: "${title}", isCompleted: ${isCompleted}) {
              _id
            }
          }
        `,
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Board', id: arg.task?.column?.board?._id },
        { type: 'Task', id: arg.task?._id },
      ],
    }),
    deleteSubtask: builder.mutation<TSubtask, TSubtask>({
      query: ({ _id }) => ({
        url: '',
        body: gql`
          mutation {
            deleteSubtask(id: "${_id}") {
              _id
            }
          }
        `,
        method: 'POST',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Board', id: arg.task?.column?.board?._id },
        { type: 'Task', id: arg.task?._id },
      ],
    }),
  }),
});

export const boardApiReducer = boardApi.reducer;

export const boardApiMiddleware = boardApi.middleware;

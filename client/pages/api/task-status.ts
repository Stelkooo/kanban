// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import hygraph from '@/lib/graphql-client';
import { gql } from 'graphql-request';
import { TSubtask, TTask } from '@/types/kanban.types';

type PatchTask = {
  task: TTask;
  newColumnId: string;
};

type DataCreateTask = {
  createTask: { id: string };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'PATCH': {
      const { task, newColumnId }: PatchTask = req.body;
      const data = await hygraph.request(
        gql`
          mutation PatchTask(
            $id: ID!
            $title: String!
            $description: String!
            $columnId: ID!
            $newColumnId: ID!
          ) {
            updateTask(
              data: {
                title: $title
                description: $description
                column: { connect: { id: $newColumnId } }
              }
              where: { id: $id }
            ) {
              id
            }
            updateColumn(
              data: {
                tasks: {
                  connect: { where: { id: $id }, position: { start: true } }
                }
              }
              where: { id: $newColumnId }
            ) {
              id
            }
            publishTask(where: { id: $id }) {
              id
            }
            publishManyColumns(
              where: { OR: [{ id: $columnId }, { id: $newColumnId }] }
            ) {
              count
            }
          }
        `,
        {
          id: task.id,
          title: task.title,
          description: task.description,
          columnId: task.column.id,
          newColumnId,
        }
      );
      res.status(200).json(data);
      break;
    }
    case 'POST': {
      const task: Partial<TTask> = req.body;
      const data: DataCreateTask = await hygraph.request(
        gql`
          mutation CreateTask(
            $title: String!
            $description: String!
            $columnId: ID!
          ) {
            createTask(
              data: {
                title: $title
                description: $description
                column: { connect: { id: $columnId } }
              }
            ) {
              id
            }
            publishColumn(where: { id: $columnId }) {
              id
            }
          }
        `,
        {
          title: task.title,
          description: task.description,
          columnId: task.column?.id,
        }
      );
      const taskId = data.createTask.id;
      const publishTask = await hygraph.request(
        gql`
          mutation PublishTask(
            $taskId: ID!
          ) {
            ${
              (task?.subtasks?.length as number) > 0
                ? task.subtasks
                    ?.map(
                      (
                        subtask: Partial<TSubtask>,
                        index: number
                      ) => `create${index}: createSubtask(
            data: { title: "${subtask.title}", isCompleted: false, task: { connect: { id: $taskId } } }
          ) {
            id
          }`
                    )
                    .join('\n')
                : ''
            }
          publishTask(where: {id: $taskId}) {
            id
          }
          publishManySubtasks(where: {task: {id: $taskId}}) {
            count
          }
          }
        `,
        {
          taskId,
        }
      );
      res.status(200).json(publishTask);
      break;
    }
    default: {
      res.status(200).json(':/');
    }
  }
}

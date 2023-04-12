// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import hygraph from '@/lib/graphql-client';
import { gql } from 'graphql-request';
import { TSubtask } from '@/types/kanban.types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'PATCH': {
      const subtask: TSubtask = req.body;
      const patchSubtask = await hygraph.request(
        gql`
          mutation PatchSubtasks($id: ID!, $isCompleted: Boolean!) {
            updateSubtask(
              data: { isCompleted: $isCompleted }
              where: { id: $id }
            ) {
              id
            }
            publishSubtask(where: { id: $id }) {
              id
            }
          }
        `,
        { id: subtask.id, isCompleted: subtask.isCompleted }
      );
      res.status(200).json(patchSubtask);
      break;
    }
    default: {
      res.status(200).json(':/');
    }
  }
}

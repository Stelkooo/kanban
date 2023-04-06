// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import hygraph from '@/lib/graphql-client';
import { gql } from 'graphql-request';
import { TBoard } from '@/types/kanban.types';

type Data = {
  boards: TBoard[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: Data = await hygraph.request(
    gql`
      query Boards {
        boards {
          id
          name
          columns {
            board {
              id
            }
            id
            name
            order
            tasks {
              column {
                id
              }
              description
              id
              title
              subtasks {
                id
                isCompleted
                title
                task {
                  id
                  column {
                    id
                  }
                }
              }
            }
          }
        }
      }
    `
  );

  res.status(200).json(data.boards);
}

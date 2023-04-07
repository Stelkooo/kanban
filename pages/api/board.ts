// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import hygraph from '@/lib/graphql-client';
import { gql } from 'graphql-request';
import { TBoard } from '@/types/kanban.types';

type Data = {
  board: TBoard;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  switch (req.method) {
    case 'PATCH': {
      const data: Data = await hygraph.request(
        gql`
          mutation PatchBoard($id: ID!, $name: String!) {
            updateBoard(data: { name: $name }, where: { id: $id }) {
              id
            }
            publishBoard(where: { id: $id }) {
              id
            }
          }
        `,
        { id, name: req.body.name }
      );
      res.status(200).json(data.board);
      break;
    }
    default: {
      const data: Data = await hygraph.request(
        gql`
          query Board($id: ID!) {
            board(where: { id: $id }) {
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
                  id
                  title
                  description
                  subtasks {
                    id
                    isCompleted
                    title
                    task {
                      column {
                        id
                      }
                      id
                    }
                  }
                }
              }
            }
          }
        `,
        { id }
      );
      res.status(200).json(data.board);
    }
  }
}

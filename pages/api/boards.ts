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
        }
      }
    `
  );
  res.status(200).json(data.boards);
}

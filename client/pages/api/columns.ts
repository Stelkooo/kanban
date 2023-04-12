// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import hygraph from '@/lib/graphql-client';
import { gql } from 'graphql-request';
import { TColumn } from '@/types/kanban.types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST': {
      const { boardId, createdColumns, updatedColumns, deletedColumns } =
        req.body;
      const query = gql`
        mutation Columns($boardId: ID!) {
          ${
            createdColumns.length > 0
              ? createdColumns
                  .map(
                    (
                      column: Partial<TColumn>,
                      index: number
                    ) => `create${index}: createColumn(
            data: { name: "${column.name}", board: { connect: { id: $boardId } } }
          ) {
            id
          }`
                  )
                  .join('\n')
              : ''
          }
          ${
            updatedColumns.length > 0
              ? updatedColumns
                  .map(
                    (
                      column: Partial<TColumn>,
                      index: number
                    ) => `update${index}: updateColumn(where: {id: "${column.id}"}, data: {name: "${column.name}"}) {
                id
            }`
                  )
                  .join('\n')
              : ''
          }
          ${
            deletedColumns.length > 0
              ? deletedColumns
                  .map(
                    (
                      column: TColumn,
                      index: number
                    ) => `delete${index}: deleteColumn(where: { id: "${column.id}" }) {
            id
          }`
                  )
                  .join('\n')
              : ''
          }
          publishBoard(where: { id: $boardId }) {
            id
          }
          publishManyColumns(
            to: PUBLISHED
            where: { board: { id: $boardId } }
          ) {
            count
          }
        }
      `;
      const data = await hygraph.request(query, { boardId });
      res.status(200).json(data);
      break;
    }
    default:
      res.status(200).json('hello there');
  }
}

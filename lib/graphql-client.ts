import { GraphQLClient } from 'graphql-request';

const hygraph = new GraphQLClient(process.env.HYGRAPH_API_KEY as string);

hygraph.setHeaders({
  authorization: `Bearer ${process.env.HYGRAPH_AUTH_KEY as string}`,
  'gcms-stage': 'PUBLISHED',
});

export default hygraph;

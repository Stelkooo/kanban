import { GraphQLClient } from 'graphql-request';

const hygraph = new GraphQLClient(process.env.HYGRAPH_API_KEY as string);

export default hygraph;

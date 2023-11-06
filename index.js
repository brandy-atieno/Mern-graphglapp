import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import dotenv from 'dotenv';
dotenv.config();

import dbConnection from './config.js';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';

dbConnection();

const server =new ApolloServer({
  typeDefs,
  resolvers,
  context:({req})=>({req}) //forward the request body
})
const {url}= await startStandaloneServer(
  server,{ listen : {port:4000}}
)
console.log(`Server running on port:${url}`)

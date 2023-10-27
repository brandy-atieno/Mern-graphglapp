import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import dotenv from 'dotenv';
dotenv.config();

import dbConnection from './config.js';
import postModel from './models/post.js';
const typeDefs = `#graphql
type Post{
  id: ID!,
  description: String!,
  username: String!
} 
type Query{
  getPosts:[Post]

 }
`
;
const resolvers ={
  Query :{
   async getPosts(){
    try{
    const posts= await postModel.find()
    return posts
    }
    catch(err){
    throw new Error(err)
    }
  }

}
}
dbConnection(); 

const server =new ApolloServer({
  typeDefs,
  resolvers
})
const {url}= await startStandaloneServer(
  server,{ listen : {port:4000}}
)
console.log(`Server running on port:${url}`)

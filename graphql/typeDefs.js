import { ApolloServer } from '@apollo/server';

const typeDefs = `#graphql
type Post{
  id: ID!,
  description: String!,
  username: String!
} 
type User{
    id: ID!,
    email:String!,
    token: String!,
    username: String!
}
input RegisterInput{
    username: String!,
    password: String!,
    confirmPassword: String!,
    email:String

}
type Query{
  getPosts:[Post]

 }
 type Mutation{
    register(registerInput: RegisterInput): User!,
    login(username: String!,password: String!):User!
 }
`

export default typeDefs
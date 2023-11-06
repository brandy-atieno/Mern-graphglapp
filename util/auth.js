import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
export const auth = (context) => {
    if (context.req && context.req.headers) {
      const authHeader = context.req.headers.authorization;
      if (authHeader) {
        const token = authHeader.split('Bearer ')[1];
        if (token) {
          try {
            const user = jwt.verify(token, process.env.SECRET_KEY);
            return user;
          } catch (err) {
            throw new GraphQLError('Invalid token');
          }
        } else {
          throw new Error('Authentication token must be a Bearer token');
        }
      } else {
        throw new Error('Authorization header must be provided');
      }
    } else {
      throw new Error('Request headers are missing');
    }
  }
  
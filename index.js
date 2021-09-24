const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
  type Query {
    Greeting: String!
  }
`;

const resolvers = {
  Query: {
    Greeting: () => 'Hello Kharioki!',
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start({ port: 7777 }, () => console.log('Server is running on localhost:7777'));

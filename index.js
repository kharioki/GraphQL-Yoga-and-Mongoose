const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
  type Query {
    Greeting: String!
    People: [PeopleObject]!
  }

  type PeopleObject {
    id: ID
    first: String!
    last: String!
  }
`;

const resolvers = {
  Query: {
    Greeting: () => 'Hello Kharioki!',
    People: () => [{ first: 'Kharioki', last: 'Tony', id: '1' }],
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start({ port: 7777 }, () => console.log('Server is running on localhost:7777'));

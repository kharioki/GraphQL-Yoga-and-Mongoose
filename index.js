require('dotenv').config({ path: './.env' });

const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const connection_url = "mongodb+srv://tony:stark@yoga.a64pc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const Schema = mongoose.Schema;
const peopleSchema = new Schema({
  first: { type: String },
  last: { type: String },
});
const People = mongoose.model('People', peopleSchema);

const typeDefs = `
  type Query {
    people: [People!]!
    person(id: ID!): People
  }

  type People {
    id: ID
    first: String!
    last: String!
  }

  type Mutation {
    createPerson(first: String!, last: String!): People
  }
`;

const resolvers = {
  Query: {
    Greeting: () => 'Hello Kharioki!',
    People: () => People.find(),
  },
};


const server = new GraphQLServer({ typeDefs, resolvers });

server.start({ port: 7777 }, () => console.log('Server is running on localhost:7777'));

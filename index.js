require('dotenv').config({ path: './.env' });

const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const connection_url = process.env.MONGO_URI;
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
    deletePerson(id: ID!): People
  }
`;

const resolvers = {
  Query: {
    people: () => People.find(),
  },
  Mutation: {
    createPerson: async (parent, args) => {
      const newPerson = new People({
        first: args.first,
        last: args.last,
      });
      const error = await newPerson.save();
      if (error) return error;
      return newPerson;
    },
    deletePerson: (parent, args) => {
      return new Promise((resolve, reject) => {
        People.findByIdAndDelete(args.id, (err, res) => {
          if (err) reject(err);
          resolve(res);
        });
      })
    },
  },
};


const server = new GraphQLServer({ typeDefs, resolvers });

server.start({ port: 7777 }, () => console.log('Server is running on localhost:7777'));

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

// server.listen(PORT, () => {
//   mongoose.set('useFindAndModify', false);
//   mongoose.connect(process.env.MONGO_URI, { 
//     useUnifiedTopology: true,
//     useNewUrlParser: true 
//   });
// })


server.start({ port: 7777 }, () => console.log('Server is running on localhost:7777'));

import { graphql } from 'graphql';
import express from 'express';
import bodyParser from 'body-parser';
import { buildSchema } from 'graphql';
const { graphqlHTTP } = require('express-graphql');

const app = express();

app.use(bodyParser.json());

app.get('/graphql', graphqlHTTP({
  schema: null
  rootValue: {},
}));

app.listen(3011);

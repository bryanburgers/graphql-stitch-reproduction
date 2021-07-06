const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Query {
    author(id: ID!): Author
    authors(ids: [ID!]!): [Author]!
  }

  type Author {
    id: ID!
    name: String!
  }
`)

const authors = {
  "dadams": {
    id: "dadams",
    name: "Douglas Adams",
  },
  "njuster": {
    id: "njuster",
    name: "Norton Juster",
  },
}

const root = {
  author: (args) => authors[args.id],
  authors: (args) => args.ids.map((id) => authors[id]),
};

const app = express()
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

module.exports = app;
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Query {
    character(id: ID!): Character
    characters(ids: [ID!]!): [Character]!
  }

  type Character {
    id: ID!
    name: String!
    book: Book!
  }

  type Book {
    id: ID!
  }
`)

const characters = {
  "arthur-dent": {
    id: "arthur-dent",
    name: "Arthur Dent",
    book: { id: "hg2g" },
  },
  "trillian": {
    id: "trillian",
    name: "Trillian",
    book: { id: "hg2g" },
  },
  "dirk-gentley": {
    id: "dirk-gentley",
    name: "Dirk Gentley",
    book: { id: "dg" },
  },
  "milo": {
    id: "milo",
    name: "Milo",
    book: { id: "ptb" },
  },
}

const root = {
  character: (args) => characters[args.id],
  characters: (args) => args.ids.map((id) => characters[id]),
};

const app = express()
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

module.exports = app;
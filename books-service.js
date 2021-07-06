const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Query {
    book(id: ID!): Book
    books(ids: [ID!]!): [Book]!
  }

  type Book {
    id: ID!
    name: String!
    author: Author!
  }

  type Author {
    id: ID!
  }
`)

const books = {
    "hg2g": {
        id: "hg2g",
        name: "Hitchhiker's Guide to the Galaxy",
        author: { id: "dadams" },
    },
    "dg": {
        id: "dg",
        name: "Dirk Gently's Holistic Detective Agency",
        author: { id: "dadams" },
    },
    "ptb": {
        id: "ptb",
        name: "The Phantom Tollbooth",
        author: { id: "njuster" },
    },
}

const root = {
    book: (args) => books[args.id],
    books: (args) => args.ids.map((id) => books[id]),
};

const app = express()
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

module.exports = app;
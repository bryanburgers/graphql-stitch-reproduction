const createSchema = require('./schema')
const { graphqlHTTP } = require('express-graphql')
const express = require('express')

const createApp = async () => {
    const schema = await createSchema()

    const graphqlHandler = graphqlHTTP((req) => {
        return { schema, graphiql: true };
    });

    const app = express();
    app.use("/", graphqlHandler)
    return app
};

module.exports = createApp
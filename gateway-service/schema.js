const { stitchSchemas } = require("@graphql-tools/stitch")
const { introspectSchema } = require("@graphql-tools/wrap")
const makeRemoteExecutor = require("./remote-executor")

async function authorSubschema(url) {
    const executor = makeRemoteExecutor(url)
    return {
        schema: await introspectSchema(executor),
        executor,
        batch: true,
        merge: {
            // Author: {
            //     fieldName: 'author',
            //     selectionSet: '{ id }',
            //     args: originalObject => ({ id: originalObject.id }),
            //     canonical: true,
            // }
            Author: {
                fieldName: "authors",
                selectionSet: "{ id }",
                key: ({ id }) => id,
                argsFromKeys: (ids) => ({ ids }),
                canonical: true,
            },
        }
    }
}

async function bookSubschema(url) {
    const executor = makeRemoteExecutor(url)
    return {
        schema: await introspectSchema(executor),
        executor,
        batch: true,
        merge: {
            // Book: {
            //     fieldName: 'book',
            //     selectionSet: '{ id }',
            //     args: originalObject => ({ id: originalObject.id }),
            //     canonical: true,
            // }
            Book: {
                fieldName: "books",
                selectionSet: "{ id }",
                key: ({ id }) => id,
                argsFromKeys: (ids) => ({ ids }),
                canonical: true,
            },
        }
    }
}

async function characterSubschema(url) {
    const executor = makeRemoteExecutor(url)
    return {
        schema: await introspectSchema(executor),
        executor,
        batch: true,
        merge: {
            // Character: {
            //     fieldName: 'character',
            //     selectionSet: '{ id }',
            //     args: originalObject => ({ id: originalObject.id }),
            //     canonical: true,
            // }
            Character: {
                fieldName: "characters",
                selectionSet: "{ id }",
                key: ({ id }) => id,
                argsFromKeys: (ids) => ({ ids }),
                canonical: true,
            },
        }
    }
}

async function createSchema() {
    const subschemas = await Promise.all([
        authorSubschema("http://localhost:4000/graphql"),
        bookSubschema("http://localhost:4001/graphql"),
        characterSubschema("http://localhost:4002/graphql"),
    ])

    const schema = stitchSchemas({
        subschemas,
        logger: {
            log: (error) => console.error(error)
        },
    })

    return schema
}

module.exports = createSchema
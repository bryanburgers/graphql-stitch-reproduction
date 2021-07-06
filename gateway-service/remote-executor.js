const { AsyncExecutor } = require("@graphql-tools/utils")
const { print } = require("graphql")
const fetch = require("node-fetch")

function makeRemoteExecutor(url) {
    return async ({ document, variables, context }) => {
        const headers = {
            "Content-Type": "application/json",
        };

        if (context) {
            if (context.userAgent) {
                headers["user-agent"] = context.userAgent
            }
        }

        const query = print(document)
        const fetchResult = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify({ query, variables }),
        });

        return await fetchResult.json()
    };
}

module.exports = makeRemoteExecutor
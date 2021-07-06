const authorsService = require('./authors-service')
const booksService = require('./books-service')
const charactersService = require('./characters-service')
const createGatewayService = require('./gateway-service')

async function main() {
    authorsService.listen(4000)
    console.log("Authors service running on port 4000")
    booksService.listen(4001)
    console.log("Books service running on port 4001")
    charactersService.listen(4002)
    console.log("Characters service running on port 4002")

    const gatewayService = await createGatewayService()
    gatewayService.listen(4003)
    console.log("Gateway service running on port 4003")
}

main().catch(err => console.log(err))
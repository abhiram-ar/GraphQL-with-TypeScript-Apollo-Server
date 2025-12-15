import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone'
import { resolvers } from "./resolvers"

import { readFileSync } from "node:fs"
import path from 'node:path'
import { gql } from "graphql-tag"
import { ListingAPI } from "./datasources/listing-api"

const typeDefs = gql(
   readFileSync(path.resolve(__dirname, "./schema.graphql"), {
      encoding: "utf-8",
   })
);

async function startApolloServer() {
   const server = new ApolloServer({ typeDefs, resolvers })
   const { url } = await startStandaloneServer(server, {
      
      // this object becomes our resolver's contextValue, the third positional argument
      context: async () => {
         const { cache } = server
         return { dataSources: { listingAPI: new ListingAPI({ cache }) } }
      }
   })
   console.log(`
      Apollo server running!
      query at: ${url}
      `)
}

startApolloServer()

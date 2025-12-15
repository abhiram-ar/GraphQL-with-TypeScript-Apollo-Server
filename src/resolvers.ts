import type { Resolvers } from "./types"

export const resolvers: Resolvers = {
   Query: {
      featuredListing: (_, __, { dataSources }) => {
         return dataSources.listingAPI.getFeatureListing()
      }
   }
}
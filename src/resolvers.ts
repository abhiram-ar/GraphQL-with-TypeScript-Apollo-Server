import { validateFullAmenities } from "./helpers"
import type { Resolvers } from "./types"

export const resolvers: Resolvers = {
   Query: {
      featuredListing: (_, __, { dataSources }) => {
         return dataSources.listingAPI.getFeatureListing()
      },

      listing: (_, { id }, { dataSources }) => {
         return dataSources.listingAPI.getListing(id)
      }
   },

   Listing: {
      amenities: ({ id, amenities }, _args, { dataSources }, _info) => {
         return validateFullAmenities(amenities) ? amenities : dataSources.listingAPI.getAmenities(id)
      }
   }
}
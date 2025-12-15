import { RESTDataSource } from "@apollo/datasource-rest"
import type { Listing } from "../types"

export class ListingAPI extends RESTDataSource {
   baseURL = "https://rt-airlock-services-listing.herokuapp.com/" // make sure to end with '/'

   getFeatureListing() {
      return this.get<Listing[]>("featured-listings")
   }

   getListing(listingId: string) {
      return this.get<Listing>(`listings/${listingId}`)
   }
}
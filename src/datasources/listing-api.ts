import { RESTDataSource } from "@apollo/datasource-rest"
import DataLoader from "dataloader";
import type { Amenity, Listing } from "../types"

export class ListingAPI extends RESTDataSource {
   baseURL = "https://rt-airlock-services-listing.herokuapp.com/" // make sure to end with '/'

   private batchAmenities = new DataLoader(async (listingIds: string[]): Promise<Amenity[][]> => {
      console.log("Making one batched call with ", listingIds);

      const amenitiesList = await this.get<Amenity[][]>("amenities/listings", { params: { ids: listingIds.join(",") } })
      console.log("Received batched amenities for ", amenitiesList.length, " listings");
      return amenitiesList
   })

   getFeatureListing() {
      console.log("Making a call for featured listings");
      return this.get<Listing[]>("featured-listings")
   }

   getListing(listingId: string) {
      console.log("Making a call for listing with ", listingId);
      return this.get<Listing>(`listings/${listingId}`)
   }

   // Old single-call method for amenities
   // getAmenities(listingId: string) {
   //    console.log("Making a follow-up call for amenities with ", listingId);
   //    return this.get<Amenity[]>(`listings/${listingId}/amenities`)
   // }

   getAmenities(listingId: string){
      console.log("Passing listingID to the data loader: ", listingId);
      return this.batchAmenities.load(listingId)
   }
}
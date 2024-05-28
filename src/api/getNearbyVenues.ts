import { VenueDetails } from "../types/VenueDetails.types";

function getNearbyVenues(
  apiKey: string,
  venueQuery: string
): Promise<VenueDetails[]> {
  const endpoint =
    "https://api.foursquare.com/v3/places/nearby?ll=51.509223%2C-0.113492";

  return fetch(`${endpoint}&query=${venueQuery}`, {
    method: "GET",
    headers: {
      Authorization: apiKey,
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data.results)
    .catch((err) => {
      throw new Error(`Failed to fetch nearby venues: ${err}`);
    });
}

export default getNearbyVenues;

import { VenueImage } from "../types/VenueImage.type";

function getVenueImage(apiKey: string, fsq_id: string): Promise<VenueImage[]> {
  const endpoint = `https://api.foursquare.com/v3/places/${fsq_id}/photos?sort=POPULAR`;

  return fetch(`${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: apiKey,
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(`Failed to fetch venue image: ${err}`);
    });
}

export default getVenueImage;

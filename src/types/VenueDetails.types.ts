export interface VenueCategory {
  id: number;
  short_name: string;
}

export interface VenueLocation {
  formatted_address?: string;
  postcode?: string;
}

export interface VenueDetails {
  fsq_id: string;
  name: string;
  location: VenueLocation;
  categories: VenueCategory[];
}

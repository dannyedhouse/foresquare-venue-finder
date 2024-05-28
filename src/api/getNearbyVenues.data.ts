import { VenueDetails } from "../types/VenueDetails.types";

export const mockVenueDetails: VenueDetails[] = [
  {
    fsq_id: "1",
    name: "Venue 1",
    location: {
      formatted_address: "Address 1",
      postcode: "SE1 7EW",
    },
    categories: [
      {
        id: 1,
        short_name: "Category 1",
      },
      {
        id: 2,
        short_name: "Category 2",
      },
    ],
  },
  {
    fsq_id: "2",
    name: "Venue 2",
    location: {
      formatted_address: "Address 2",
      postcode: "SE16 3LW",
    },
    categories: [
      {
        id: 3,
        short_name: "Category 3",
      },
      {
        id: 4,
        short_name: "Category 4",
      },
    ],
  },
  {
    fsq_id: "3",
    name: "Venue 3",
    location: {
      formatted_address: "Address 3",
      postcode: "E14 UTT",
    },
    categories: [
      {
        id: 5,
        short_name: "Category 5",
      },
      {
        id: 6,
        short_name: "Category 6",
      },
    ],
  },
  {
    fsq_id: "4",
    name: "Venue 4",
    location: {
      formatted_address: "Address 4",
      postcode: "SW12 4LT",
    },
    categories: [
      {
        id: 7,
        short_name: "Category 7",
      },
      {
        id: 8,
        short_name: "Category 8",
      },
    ],
  },
  {
    fsq_id: "5",
    name: "Venue 5",
    location: {
      formatted_address: "Address 5",
      postcode: "SW1 11T",
    },
    categories: [
      {
        id: 9,
        short_name: "Category 9",
      },
      {
        id: 10,
        short_name: "Category 10",
      },
    ],
  },
];

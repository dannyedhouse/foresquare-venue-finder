import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import getNearbyVenues from "../../api/getNearbyVenues";
import VenueCard from "../VenueCard/VenueCard";
import styles from "./ResultsGrid.module.css";
import { VenueDetails } from "../../types/VenueDetails.types";
import { MdError } from "react-icons/md";
import { FaDizzy } from "react-icons/fa";
import { useApiKeyContext } from "../../apiKeyContext";

export default function ResultsGrid() {
  const { apiKey } = useApiKeyContext();
  const [searchParams] = useSearchParams();
  const venue = searchParams.get("venue") ?? "";

  const results = useQuery({
    queryKey: ["nearbyPlaces", venue, apiKey],
    queryFn: () => getNearbyVenues(apiKey, venue),
    enabled: !!apiKey && !!venue,
  });

  const data = results.data ?? [];

  return (
    <div className={styles.resultsContainer}>
      <SearchStatus results={results} />
      <ul className={styles.resultsGrid}>
        {data?.map((venue) => (
          <VenueCard key={venue.fsq_id} venue={venue} />
        ))}
      </ul>
    </div>
  );
}

function SearchStatus({
  results,
}: {
  results: UseQueryResult<VenueDetails[], Error>;
}) {
  if (results.isLoading) {
    return (
      <div className={styles.statusScreen}>
        <p>Finding the best venues...</p>
        <span className="loader"></span>
      </div>
    );
  }
  if (results.error) {
    return (
      <div className={styles.statusScreen}>
        <MdError size={35} />
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }
  if (results.data?.length === 0) {
    return (
      <div className={styles.statusScreen}>
        <FaDizzy size={35} />
        <p>No results found. Please try another search.</p>
      </div>
    );
  }
  return null;
}

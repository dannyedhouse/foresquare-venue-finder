import { useState } from "react";
import styles from "./VenueCard.module.css";
import { VenueDetails } from "../../types/VenueDetails.types";
import VenueSidebar from "../VenueModal/VenueModal";

interface VenueCardProps {
  venue: VenueDetails;
}

function VenueCard({ venue }: VenueCardProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <li>
      <button className={styles.venueCard} onClick={() => setIsModalOpen(true)}>
        <h3 style={{ margin: "2px" }}>{venue.name}</h3>
        <span>{venue.location.postcode}</span>
      </button>

      {isModalOpen && (
        <VenueSidebar closeModal={closeModal} venueDetails={venue} />
      )}
    </li>
  );
}

export default VenueCard;

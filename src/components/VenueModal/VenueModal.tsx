import { MdPinDrop } from "react-icons/md";
import CategoryPill from "../CategoryPill/CategoryPill";
import Modal from "../Modal/Modal";
import { VenueDetails } from "../../types/VenueDetails.types";
import styles from "./VenueModal.module.css";
import { useQuery } from "@tanstack/react-query";
import getVenueImage from "../../api/getVenueImage";
import { useApiKeyContext } from "../../apiKeyContext";

interface VenueModalProps {
  closeModal: () => void;
  venueDetails: VenueDetails;
}

export default function VenueModal({
  closeModal,
  venueDetails,
}: VenueModalProps) {
  const { apiKey } = useApiKeyContext();

  const photoResults = useQuery({
    queryKey: ["venuePhoto", venueDetails.fsq_id],
    queryFn: () => getVenueImage(apiKey, venueDetails.fsq_id),
    enabled: !!apiKey,
  });

  const data = photoResults.data ?? [];

  let url = "";
  if (data.length > 0 || photoResults.error) {
    url = data[0].prefix + "300x300" + data[0].suffix;
  }

  return (
    <Modal onModalClose={closeModal}>
      {photoResults.isLoading ? (
        <div className={styles.imageLoading}>
          <span className="loader" data-testid="loader"></span>
        </div>
      ) : (
        <img
          src={url || "./fallback-img.webp"}
          alt={venueDetails.name}
          className={styles.venueImage}
          width={"100%"}
          height={"300px"}
        />
      )}

      <h1 className={styles.venueName}>{venueDetails.name}</h1>
      <p className={styles.modalLocation}>
        <MdPinDrop size={30} />
        {venueDetails.location.formatted_address}
      </p>

      <div className={styles.categoryPills}>
        {venueDetails.categories?.map((category) => (
          <CategoryPill key={category.id} venueCategory={category} />
        ))}
      </div>

      <button className={styles.closeModalBtn} onClick={closeModal}>
        Close
      </button>
    </Modal>
  );
}

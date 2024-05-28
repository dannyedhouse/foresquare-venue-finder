import styles from "./CategoryPill.module.css";
import { VenueCategory } from "../../types/VenueDetails.types";

interface CategoryPillProps {
  venueCategory: VenueCategory;
}

export default function CategoryPill({ venueCategory }: CategoryPillProps) {
  return <div className={styles.categoryPill}>{venueCategory.short_name}</div>;
}

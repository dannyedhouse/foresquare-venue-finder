import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./SearchContainer.module.css";
import { toTitleCase } from "../../utils/convertToTitleCase";
import { FaSearch } from "react-icons/fa";
import { useApiKeyContext } from "../../apiKeyContext";

type FormData = {
  apiKey: string;
  venueName: string;
};

function SearchContainer() {
  const navigate = useNavigate();
  const { apiKey, setNewKey } = useApiKeyContext();
  const { register, handleSubmit, setValue, getValues } = useForm<FormData>();
  const [searchParams] = useSearchParams();

  const venue = toTitleCase(searchParams.get("venue") ?? "");

  const values = getValues();
  // syncs field with URL
  if (values.venueName !== venue) {
    setValue("venueName", venue);
  }

  function onSubmit(formData: FormData) {
    setNewKey(formData.apiKey);
    navigate(`/search?venue=${formData.venueName.toLowerCase()}`);
  }

  return (
    <div className={styles.searchContainer}>
      <form
        className={styles.searchForm}
        onSubmit={handleSubmit(onSubmit)}
        data-testid="search-form"
      >
        <div className={styles.inputContainer}>
          <div>
            <label htmlFor="apiKey">API Key:</label>
            <input
              {...register("apiKey")}
              className={styles.searchInput}
              name="apiKey"
              id="apiKey"
              type="text"
              required
              defaultValue={apiKey}
            ></input>
          </div>
          <div>
            <label htmlFor="venueName">Venue name:</label>
            <input
              {...register("venueName")}
              className={styles.searchInput}
              name="venueName"
              id="venueName"
              type="text"
              placeholder="e.g. Restaurant"
              required
              maxLength={60}
              defaultValue={venue}
            />
          </div>
        </div>
        <button type="submit" className={styles.searchBtn}>
          <span className={styles.searchBtnText}>Search</span>
          <FaSearch className={styles.searchBtnIcon} />
        </button>
      </form>
    </div>
  );
}

export default SearchContainer;

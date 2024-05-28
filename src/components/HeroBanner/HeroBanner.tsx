import { PropsWithChildren, ReactNode } from "react";
import styles from "./HeroBanner.module.css";

interface HeroBannerProps {
  children: ReactNode;
}

function HeroBanner({
  children,
}: PropsWithChildren<HeroBannerProps>): JSX.Element {
  return (
    <div className={styles.heroBanner}>
      <div>
        <h1 className={styles.header}>Find your perfect London venue</h1>
      </div>
      {children}
    </div>
  );
}

export default HeroBanner;

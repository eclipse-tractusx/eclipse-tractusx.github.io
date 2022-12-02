import React from "react";
import Link from "@docusaurus/Link";

import styles from "./styles.module.css";

function HomePageBanner() {
  return (
    <header className={styles.heroBanner}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Welcome <br />
          to Tractus-x
        </h1>
        <p className={styles.subtitle}>
          We support service and app provider in developing applications for the
          Catena-X ecosystem.
          <br /> Find documentation, APIs, SDKs and more.
        </p>
        <div>
          <Link className={styles.button} to="/docs/kits">
            OUR DEV KITS
          </Link>
        </div>
      </div>
    </header>
  );
}

export default HomePageBanner;

import React from "react";
import Link from "@docusaurus/Link";
import NewsTicker from "../NewsTicker";

import styles from "./styles.module.css";

function HomePageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Welcome to <br />
          Eclipse Tractus-X
        </h1>
        <div className={styles.subtitle_box}>
          <p className={styles.subtitle}>
            We support service and app provider in developing applications for
            the Catena-X ecosystem. Find documentation, APIs, SDKs and more.
          </p>
        </div>
        <div>
          <Link className={styles.button} to="/developer">
            OUR DEV KITS
          </Link>
        </div>
      </div>
      <NewsTicker />
    </header>
  );
}

export default HomePageHeader;
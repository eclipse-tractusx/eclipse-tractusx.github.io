import React from "react";
// import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
// import clsx from "clsx";
import Link from "@docusaurus/Link";

import styles from "./styles.module.css";
import NewsTicker from "../NewsTicker";

function HomePageBanner() {
  //   const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className={styles.container}>
        {/* <h1 className="hero__title">Welcome to {siteConfig.title}</h1> */}
        <h1 className={styles.title}>
          Welcome <br />
          to Tractus-x
        </h1>
        {/* <p className="hero__subtitle">{siteConfig.tagline}</p> */}
        <p className={styles.subtitle}>
          We support service and app provider in developing applications for the
          Catena-X ecosystem.
          <br /> Find documentation, APIs, SDKs and more.
        </p>
        <div>
          <Link className={styles.button} to="/kits">
            OUR DEV KITS
          </Link>
        </div>
      </div>
      <NewsTicker />
    </header>
  );
}

export default HomePageBanner;

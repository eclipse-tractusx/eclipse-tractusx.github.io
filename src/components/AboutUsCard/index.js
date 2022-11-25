import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

import EclipseFoundationImageUrl from "@site/static/img/about_eclipse_logo.png";

export default function AboutUsCard() {
  return (
    <section className={styles.about_us}>
      <div className={styles.container}>
        <div className={styles.img_container}>
          <img className={styles.img} src={EclipseFoundationImageUrl} />
        </div>

        <div className={styles.information_container}>
          <h2 className={styles.title}>About Eclipse Tractus-X</h2>
          <p className={styles.subtitle}>
            Background about Eclipse Tractus-X, license and legal information.
          </p>
          <div>
            <Link className={styles.button} to="/about-us">
              ABOUT TRACTUS X
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

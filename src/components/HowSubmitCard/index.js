import React from "react";
import Link from "@docusaurus/Link";

import styles from "./styles.module.css";

export default function HowSubmitCard() {
  return (
    <section className={styles.submit}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          How to Submit <br /> your own Application
        </h2>
        <p className={styles.subtitle}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod <br />
          tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
          voluptua.
        </p>
        <div>
          <Link className={styles.button} to="/submit-app">
            HOW TO SUBMIT
          </Link>
        </div>
      </div>
    </section>
  );
}

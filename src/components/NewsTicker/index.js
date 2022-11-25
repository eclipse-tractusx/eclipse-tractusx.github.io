import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

export default function NewsTicker() {
  return (
    <section className={styles.news_ticker}>
      <div className={styles.container}>
        <div>
          <Link className={styles.button} to="/news">
            NEWS
          </Link>
        </div>

        <div className={styles.date}>00.00.0000</div>

        <div className={styles.introduction}>
          Lorem ipsum dolor sit amet, patrichtry aimed fuerct, sed do eiusmod
          tempor incididunt ut labore...
        </div>

        <div>&gt;</div>
      </div>
    </section>
  );
}

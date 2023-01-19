import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

export default function NewsTicker() {
  return (
    <section className={styles.news_ticker}>
      <div className={styles.container}>
        <div className={styles.button_container}>
          <Link className={styles.button} /*to="/news"*/>
            News
          </Link>
        </div>

        <div className={styles.date}>06.12.2022</div>

        <div className={styles.introduction}>
          This is the launch of the Tractus-X Developer Website - more infos to come.
        </div>

        <div>&gt;</div>
      </div>
    </section>
  );
}
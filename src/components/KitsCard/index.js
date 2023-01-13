import React from "react";
import styles from "./styles.module.css";


export default function KitsCard({title, subtitle, img}) {
  return (
    <section className={styles.kits_card}>
      <div className={styles.container}>
        <div className={styles.information_container}>
          <h2 className={styles.title}>
            {title}
          </h2>
          <p className={styles.subtitle}>
            {subtitle}
          </p>
        </div>

        <div className={styles.img_container}>
          <img className={styles.img} src={img}/>
        </div>
      </div>
    </section>
  );
}
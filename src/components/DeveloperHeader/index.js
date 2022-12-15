import React from "react";
import KitsCoreSvg from '../../../static/img/kits&core.svg'

import styles from "./styles.module.css";

export default function DeveloperHeader() {
  return (
      <header className={styles.developer_header}>
      <div className={styles.container}>
        <div className={styles.svg_container}>
          <KitsCoreSvg className={styles.svg}/>
        </div>
        <div className={styles.information_container}>
          <h2 className={styles.title}>Kits & Core Services</h2>
          <p className={styles.subtitle}>
          Kits aim to accelerate the adoption, development, and operations of the next generation Business Applications and Services. Catena-X wants to support developers in order to accelerate the development of services and applications to contribute significantly to the rapid scaling of the Catena-X ecosystem.
          </p>
        </div>
      </div>
    </header>
  );
}
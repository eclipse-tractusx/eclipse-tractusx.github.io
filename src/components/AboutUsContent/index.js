import React from "react";
import styles from "./styles.module.css";

import TractusXBackground from "@site/static/img/tractus-x_background-minified.png";
import LicensesImg from "@site/static/img/licenses-minified.png";


export default function AboutUsContent() {
  return (
    <section className={styles.about_content}>
      <div className={styles.container}>

        <div className={styles.title_container}>
          <h2 className={styles.title}>Background</h2>
        </div>

        <div className={styles.img_container}>
          <img className={styles.img} src={TractusXBackground} /> 
        </div>

        <div className={styles.information_container}>
          <p className={styles.description}>
          Tractus-X supports developers to accelerate the development and operation of services / applications and to contribute significantly to the rapid scaling of the ecosystem. Therefore Tractus-X provides (I) reference implementations of core and enabling services as well as (II) KITs to accelerate the development of interoperable and innovative applications and the on-boarding to the Catena-X ecosystem. 
          </p>

          <p className={styles.description}>
          The Catena-X ecosystem consists of the following three areas, which are connected by the Tractus-X project:
          </p>

          <p className={styles.description}>
          (1) The <strong>Catena-X Automotive Network e.V.</strong> (in the following called ‘association’) is responsible for standardization, certifications, and governance of the Catena-X ecosystem and is managing the Eclipse Tractus-X project. Association members can participate in working groups to actively shape the Catena-X ecosystem.
          </p>

          <p className={styles.description}>
          (2) The <strong>development environment</strong> is responsible for the development of the initial reference implementations of the core and enabling services. The reference implementations are managed in the Tractus-X repositories, that contain, among other things, source code, technical documentation, and deployment instructions.
          </p>

          <p className={styles.description}>
          (3) In the <strong>operating environment</strong>, the open-source reference implementations can be freely used, modified, and operated by providers. Providers include core service provider (e.g., marketplaces), enablement service provider (e.g., connector), and business application provider (e.g., traceability applications). 
          </p>

          <p className={styles.description}>
          <a href="https://bugs.eclipse.org/bugs/">Report a Bug</a>
          </p>
        </div>

        <div className={styles.img_container}>
          <img className={styles.licenses} src={LicensesImg} /> 
        </div>       
      </div>
    </section>
  );
}

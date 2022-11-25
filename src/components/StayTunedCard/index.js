import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./styles.module.css";

import BriefImg from "@site/static/img/brief.png";
import ContactImg from "@site/static/img/contact.png";

export default function StayTunedCard() {
  return (
    <section className={styles.stay_tuned}>
      <div className={styles.container}>
        <div className={clsx(styles.card, styles.left)}>
          <div className={styles.img_container}>
            <img src={BriefImg} />
          </div>
          <h2 className={styles.title}>Stay Tuned</h2>
          <p className={styles.subtitle}>
            Do you want to be informed about future products, events and
            showcases?
          </p>
          <p className={styles.subtitle}>
            Subscribe to our newsletter! <br />
            You can cancel the subscription at any time.{" "}
          </p>
          <input type="email" placeholder="E-Mail" />
          <div>
            <Link className={styles.button} to="/subscribe">
              SUBSCRIBE
            </Link>
          </div>
        </div>

        <div className={clsx(styles.card, styles.right)}>
          <div className={styles.img_container}>
            <img src={ContactImg} />
          </div>
          <h2 className={styles.title}>Contact</h2>
          <p className={styles.subtitle}>
            Do you need help or are you looking for a certain product? Do you
            have any suggestions or specific requirements? Get in touch!
          </p>
          <div>
            <Link className={styles.button} to="/contact">
              CONTACT US
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

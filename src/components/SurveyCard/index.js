import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

import SurveyImg from "@site/static/img/survey.png";

export default function SurveyCard() {
  return (
    <section className={styles.survey_card}>
      <div className={styles.container}>
        <div className={styles.img_container}>
          <img className={styles.img} src={SurveyImg} />
        </div>

        <div className={styles.information_container}>
          <h2 className={styles.title}>WE LOVE TO HEAR YOUR FEEDBACK!</h2>
          <p className={styles.subtitle}>
            Share your opinion about the Developer Portal and help us improve
            it.
          </p>
          <div>
            <Link className={styles.button} to="/survey">
              TAKE THE SURVEY
            </Link>
          </div>
        </div>
      </div>
    </section>
    //     <section>
    //       <div className={styles.container}>
    //         <div className={`${styles.card} ${styles.left}`}>
    //           <div className={styles.img_container}>
    //             <img className={styles.img} src={SurveyImg} />
    //           </div>
    //         </div>

    //         <div className={`${styles.card} ${styles.right}`}>
    //           <h2>WE LOVE TO HEAR YOUR FEEDBACK!</h2>
    //           <p>
    //             Share your opinion about the Developer Portal and help us improve
    //             it.
    //           </p>
    //           <div>
    //             <Link
    //               className="button button--warning button--md"
    //               to="/your-feedback"
    //             >
    //               TAKE THE SURVEY
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </section>
  );
}

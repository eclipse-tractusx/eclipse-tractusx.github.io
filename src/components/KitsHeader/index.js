import React from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";

import styles from "./styles.module.css";


export default function KitsHeader({title, subtitle, SVG}) {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
      <header className={styles.kits_header}>
      <div className={styles.container}>
        <div className={styles.logo_container}>
          <div className={styles.go_back}>
            <Link className={styles.go_back_link} to="/developer">
              &larr; Back to All Kits
            </Link>
          </div>
          <div className={styles.svg_container}>
            {<SVG className={styles.svg}/>}
          </div>
          <div className={styles.information_container}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.subtitle}>
              {subtitle}
            </p>
          </div>
        </div>

        <div className={styles.links_container}>
          <div className={styles.link}>
            <Link className={splitLocation[2] == "adoptionview" ? styles.selected : styles.button} to={`/${splitLocation[1]}/adoptionview`}>
              ADOPTION VIEW
            </Link>
          </div>

          <div className={styles.link}>
            <Link className={splitLocation[2] == "softwaredevelopmentview" ? styles.selected : styles.button} /* to={`/${splitLocation[1]}/softwaredevelopmentview`} */>
              SOFTWARE DEVELOPMENT VIEW
            </Link>
          </div>

          <div className={styles.link}>
            <Link className={splitLocation[2] == "softwareoperationview" ? styles.selected : styles.button} /* to={`/${splitLocation[1]}/softwareoperationview`} */>
              SOFTWARE OPERATION VIEW
            </Link>
          </div>

          <div className={styles.link}>
            <Link className={splitLocation[2] == "documentation" ? styles.selected : styles.button} to={`/${splitLocation[1]}/documentation`}>
              DOCUMENTATION
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
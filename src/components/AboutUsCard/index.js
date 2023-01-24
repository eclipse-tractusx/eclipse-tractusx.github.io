/********************************************************************************
 * Copyright (c) 2022 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0
 *
 * SPDX-License-Identifier: EPL-2.0
 ********************************************************************************/

import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

import EclipseFoundation from "@site/static/img/eclipse_foundation_logo-minified.png";

export default function AboutUsCard() {
  return (
    <section className={styles.about_us}>
      <div className={styles.container}>
        <div className={styles.img_container}>
          <img className={styles.img} src={EclipseFoundation} />
        </div>
        <div className={styles.information_container}>
          <h2 className={styles.title}>About Eclipse Tractus-X</h2>
          <p className={styles.subtitle}>
            Background about Eclipse Tractus-X, license and legal information.
          </p>
          <div>
            <Link className={styles.button} to="/aboutus">
              About Tractus-X
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
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
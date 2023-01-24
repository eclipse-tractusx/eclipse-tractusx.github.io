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
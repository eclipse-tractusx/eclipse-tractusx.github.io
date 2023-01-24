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
import NewsTicker from "../NewsTicker";

import styles from "./styles.module.css";

function HomePageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Welcome to <br />
          Eclipse Tractus-X
        </h1>
        <div className={styles.subtitle_box}>
          <p className={styles.subtitle}>
            We support service and app provider in developing applications for
            the Catena-X ecosystem. Find documentation, APIs, SDKs and more.
          </p>
        </div>
        <div>
          <Link className={styles.button} to="/developer">
            Our Dev Kits
          </Link>
        </div>
      </div>
      <NewsTicker />
    </header>
  );
}

export default HomePageHeader;
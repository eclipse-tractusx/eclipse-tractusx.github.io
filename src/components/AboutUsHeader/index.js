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
import TractusXSvg from '../../../static/img/logo_tractus-x.svg'

import styles from "./styles.module.css";

export default function AboutUsHeader() {
  return (
      <header className={styles.about_header}>
      <div className={styles.container}>
        <div className={styles.svg_container}>
          <TractusXSvg className={styles.svg}/>
        </div>
        <div className={styles.information_container}>
          <h2 className={styles.title}>About Tractus X</h2>
          <p className={styles.subtitle}>
            Eclipse Tractus-X™  is the official open-source project in the Catena-X ecosystem under the umbrella of the Eclipse Foundation.
          </p>
        </div>
      </div>
    </header>
  );
}
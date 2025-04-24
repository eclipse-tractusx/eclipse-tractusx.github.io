/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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

export default function UsageHeader(props) {
  //console.log(props)
  return (
      <header className={styles.usage_header}>
      <div className={styles.container}>
        <div className={styles.svg_container}>
          {props.icon}
        </div>
        <div className={styles.information_container}>
          <h1 className="headers-title-h1">{props.title}</h1>
          <p className="headers-subtitle-p">
            {props.description}
          </p>
        </div>
      </div>
    </header>
  );
}

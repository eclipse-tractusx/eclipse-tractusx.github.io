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

import React, { useState } from "react";
import styles from "./styles.module.css";

export default function IFrameComponent({ title, description, link, headerDescription }) {
    const [display, setDisplay] = useState('block');

    return (
        <div className={styles.title_container}>
            {headerDescription && (
            <p className="description-p">
            {headerDescription}
          </p>
          )}
            <h2 className="title-h2">{title}</h2>

            <p className="description-p">
                {description}
            </p>

            <div className={styles.iframe_container}>
                <div
                    className={styles.thumbnail}
                    style={{ display: display }}
                    onMouseOver={() => setDisplay("none")}
                ></div>
                <iframe
                    width="100%"
                    height="450"
                    src={link}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}
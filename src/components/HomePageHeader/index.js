/*********************************************************************************
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Mercedes Benz AG
 * Copyright (c) 2023, 2025 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import React from "react";
import Link from "@docusaurus/Link";
import ThemedImage from '@theme/ThemedImage';
import NewsTicker from "../NewsTicker";
import LayersIcon from '@mui/icons-material/Layers';
import GitHubIcon from '@mui/icons-material/GitHub';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import classes from "../../scss/components/HomePageHeader.module.scss";

export default function HomePageHeader() {
  return (
    <header className={classes.heroBanner}>
    {/* ThemedImage Docusaurus component that handles the BG depending on the theme displayed */}
      <ThemedImage
        // alt="Docusaurus themed image hero background"
        sources={{
          light: ('/img/main-bg-light.png'),
          dark: ('/img/main-bg-new.png'),
        }}
        className={classes.hero_bg}
      />

    {/* Content of the component */}
      <div className={classes.container}>
        <h1 className={classes.title}>
          Welcome to <br />
          Eclipse Tractus-X
        </h1>
        <div className={classes.subtitle_box}>
          <p className={classes.subtitle}>
          Where we build secure, self-sovereign & open collaborative dataspaces!
          </p>
        </div>
        <div className={classes.btn_container}>
          <Link className={classes.btn} to="/Kits">
            <LibraryBooksIcon className={classes.icon}/><span>KITs</span>
          </Link>
          <Link className={classes.btn} to="https://github.com/eclipse-tractusx">
            <GitHubIcon className={classes.icon}/><span>Our Code</span>
          </Link>
        </div>
      </div>
      <NewsTicker />
    </header>
  );
}

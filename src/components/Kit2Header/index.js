/********************************************************************************* 
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Mercedes Benz AG 
* Copyright (c) 2023 Contributors to the Eclipse Foundation
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

import React, { useEffect, useState } from "react";
import KitsCoreSvg from '@site/static/img/kits-2.0/tx-assembly-kit.svg'
import ThemedImage from '@theme/ThemedImage';
import styles from "./styles.module.css";

export default function Kit2Header() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={styles.deepdive_header}>
      {/* ThemedImage Docusaurus component that handles the BG depending on the theme displayed */}
        <ThemedImage
          // alt="Docusaurus themed image hero background"
          sources={{
            light: ('/img/main-bg-light.png'),
            dark: ('/img/main_bg-min.png'),
          }}
          className={styles.hero_bg}
          style={{
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />

      {/* Content of the component */}
        <div className={styles.image_container}>
              <ThemedImage
                // alt="Docusaurus themed image hero background"
                sources={{
                  light: ('/img/tx-logos/241215_Tractus-X_Where_We_Build_Dataspaces_Logo_Dark.png'),
                  dark: ('/img/tx-logos/241215_Tractus-X_Where_We_Build_Dataspaces_Logo_Light.png'),
                }}
                className={styles.image}
              />
        </div>
    </header>
      
  );
}
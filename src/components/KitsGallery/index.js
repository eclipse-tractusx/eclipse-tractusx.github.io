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

import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

import { galleryKits } from "@site/utils/galleryKits";

export default function KitsGallery() {
  return (
    <section className={styles.kits_gallery}>
      <div className={styles.container}>

        <div className={styles.title_container}>
          <h2 className={styles.title}>Our Kits</h2>
          <p className={styles.description}>
          Unlock the power of kits. Browse the latest kits, their documentation, <br/>
          including tutorials,sample code, articles, and API reference.
          </p>
        </div>

        <div className={styles.gallery_container}>
          {
            galleryKits.map((kit, index)=> {
              return(
                <div key={index} className={styles.gallery_item}>
                  <Link to={kit.pageRoute} className={styles.gallery_link}>
                    <img src={kit.img} className={styles.item_img}/>
                  </Link>
                </div>
              )      
            })
          }
        </div>
      </div>
    </section>
  );
}

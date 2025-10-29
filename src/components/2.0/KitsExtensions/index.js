/********************************************************************************* 
 * Copyright (c) 2025 Contributors to the Eclipse Foundation
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
import styles from "./styles.module.scss";

export default function KitsExtensions() {
  return (
    <section className={styles.extensions_section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Need More?</h2>
        <p className={styles.subtitle}>Check out the KITs used by each industrial dataspace contributor to Eclipse Tractus-X</p>
        
        <div className={styles.blocks_container}>
          {/* Catena-X dataspace block */}
          <div className={`${styles.dataspace_block} ${styles.block_catena}`}>
            <div className={styles.block_layer_1}></div>
            <div className={styles.block_layer_2}></div>
            <div className={styles.block_layer_3}></div>
            <div className={styles.block_layer_4}></div>
            <div className={styles.block_content}>
              <img src="https://catena-x.net/wp-content/uploads/2025/10/CX_Figurative_mark_RGB_pos.png" alt="Catena-X Logo" />
              <div className={styles.block_text}>
                <div className={styles.block_title}>Catena-X</div>
                <div className={styles.block_subtitle}>Automotive Industry KITs</div>
              </div>
            </div>
          </div>
          
          {/* Factory-X dataspace block */}
          <div className={`${styles.dataspace_block} ${styles.block_factory}`}>
            <div className={styles.block_layer_1}></div>
            <div className={styles.block_layer_2}></div>
            <div className={styles.block_layer_3}></div>
            <div className={styles.block_layer_4}></div>
            <div className={styles.block_content}>
              <img src="https://factory-x.org/wp-content/uploads/factory-x-logo.svg" alt="Factory-X Logo" />
              <div className={styles.block_text}>
                <div className={styles.block_title}>Factory-X</div>
                <div className={styles.block_subtitle}>Shop Floor Industry KITs</div>
              </div>
            </div>
          </div>
          
          {/* Semiconductor-X dataspace block */}
          <div className={`${styles.dataspace_block} ${styles.block_semiconductor}`}>
            <div className={styles.block_layer_1}></div>
            <div className={styles.block_layer_2}></div>
            <div className={styles.block_layer_3}></div>
            <div className={styles.block_layer_4}></div>
            <div className={styles.block_content}>
              <img src="https://www.semiconductor-x.com/wp-content/uploads/semicon-x_bildmarke.svg" alt="Semiconductor-X Logo" />
              <div className={styles.block_text}>
                <div className={styles.block_title}>Semiconductor-X</div>
                <div className={styles.block_subtitle}>Semiconductor Industry KITs</div>
              </div>
            </div>
          </div>
          
          {/* Chem-X dataspace block */}
          <div className={`${styles.dataspace_block} ${styles.block_chem}`}>
            <div className={styles.block_layer_1}></div>
            <div className={styles.block_layer_2}></div>
            <div className={styles.block_layer_3}></div>
            <div className={styles.block_layer_4}></div>
            <div className={styles.block_content}>
              <img src="https://www.chem-x.de/wp-content/uploads/2025/02/Chem-X-Logo-main.png" alt="Chem-X Logo" />
              <div className={styles.block_text}>
                <div className={styles.block_title}>Chem-X</div>
                <div className={styles.block_subtitle}>Chemical Industry KITs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
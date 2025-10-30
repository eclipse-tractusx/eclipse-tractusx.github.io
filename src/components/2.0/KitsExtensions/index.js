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
import AddIcon from '@mui/icons-material/Add';
import styles from "./styles.module.scss";

export default function KitsExtensions({ dataspaces }) {
  return (
    <section className={styles.extensions_section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Need More?</h2>
        <p className={styles.subtitle}>Check out the KITs used by each industrial dataspace contributor to Eclipse Tractus-X</p>
        
        <div className={styles.blocks_container}>
          {dataspaces.map((dataspace) => (
            <div 
              key={dataspace.id} 
              className={`${styles.dataspace_block} ${styles[`block_${dataspace.id.replace('-', '_')}`]}`}
              style={{
                '--layer-1-color': dataspace.colors.layer1,
                '--layer-2-color': dataspace.colors.layer2,
                '--layer-3-color': dataspace.colors.layer3,
                '--layer-4-color': dataspace.colors.layer4,
              }}
            >
              <div className={styles.block_layer_1}></div>
              <div className={styles.block_layer_2}></div>
              <div className={styles.block_layer_3}></div>
              <div className={styles.block_layer_4}></div>
              <div className={styles.block_content}>
                <img 
                  src={dataspace.logo.src} 
                  alt={dataspace.logo.alt}
                  width={dataspace.logo.width}
                  height={dataspace.logo.height === 'auto' ? undefined : dataspace.logo.height}
                  style={{
                    width: `${dataspace.logo.width}px`,
                    height: dataspace.logo.height === 'auto' ? 'auto' : `${dataspace.logo.height}px`,
                    objectFit: 'contain'
                  }}
                />
                <div className={styles.block_text}>
                  <div className={styles.block_title}>{dataspace.name}</div>
                  <div className={styles.block_subtitle}>{dataspace.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Hardcoded More Dataspaces block */}
          <div 
            className={`${styles.dataspace_block} ${styles.block_more_dataspaces}`}
            style={{
              '--layer-1-color': '#6366F1',
              '--layer-2-color': '#8B5CF6',
              '--layer-3-color': '#C084FC',
              '--layer-4-color': '#FF00FF',
            }}
          >
            <div className={styles.block_layer_1}></div>
            <div className={styles.block_layer_2}></div>
            <div className={styles.block_layer_3}></div>
            <div className={styles.block_layer_4}></div>
            <div className={styles.block_content}>
              <AddIcon 
                sx={{ 
                  fontSize: 80, 
                  color: 'white',
                  width: '80px',
                  height: '80px'
                }} 
              />
              <div className={styles.block_text}>
                <div className={styles.block_title}>Other Dataspaces</div>
                <div className={styles.block_subtitle}>Discover More</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
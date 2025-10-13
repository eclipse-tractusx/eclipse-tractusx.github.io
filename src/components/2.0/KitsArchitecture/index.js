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
 import styles from "./styles.module.scss";
 import CatenaXLogo from "@site/static/img/dataspace-logos/catena-x.svg"
 import FactoryXLogo from "@site/static/img/dataspace-logos/factory-x.png"
 import AerospaceXLogo from "@site/static/img/dataspace-logos/aerospace-x.png" 
 import SemiconductorXLogo from "@site/static/img/dataspace-logos/semiconductor-x.png" 
 export default function KitsArchitecture() {
   return (
     <section className={styles.architecture_section}>
       <div className={styles.container}>
         <h2 className={styles.title}>Our KITs Architecture</h2>
         
         <div className={styles.diagram}>
           {/* Top row hexagons */}
           <div className={styles.hexagon_row}>
             <div className={`${styles.hexagon} ${styles.hexagon_catena}`}>
               <div className={styles.hexagon_content}>
                 <div className={styles.hexagon_title}><CatenaXLogo /></div>
                 <div className={styles.hexagon_subtitle}>Catena-X</div>
               </div>
             </div>
             <div className={`${styles.hexagon} ${styles.hexagon_factory}`}>
               <div className={styles.hexagon_content}>
                <div className={styles.hexagon_title}><img src={FactoryXLogo} alt="Factory-X Logo" /></div>
                 <div className={styles.hexagon_subtitle}>Factory-X</div>
               </div>
             </div>
             <div className={`${styles.hexagon} ${styles.hexagon_semiconductor}`}>
               <div className={styles.hexagon_content}>
                  <div className={styles.hexagon_title}><img src={SemiconductorXLogo} alt="Semiconductor-X Logo" /></div>
                 <div className={styles.hexagon_subtitle}>Semiconductor-X</div>
               </div>
             </div>
             <div className={`${styles.hexagon} ${styles.hexagon_aerospace}`}>
               <div className={styles.hexagon_content}>
                  <div className={styles.hexagon_title}><img src={AerospaceXLogo} alt="Aerospace-X Logo" /></div>
                 <div className={styles.hexagon_subtitle}>Aerospace-X</div>
               </div>
             </div>
             <div className={`${styles.hexagon} ${styles.hexagon_other}`}>
               <div className={styles.hexagon_content}>
                <div className={`${styles.hexagon_title} ${styles.other_title}`}>+</div>
                 <div className={styles.hexagon_subtitle}>Other Dataspaces</div>
               </div>
             </div>
           </div>

           {/* Bottom rectangles */}
           <div className={styles.rectangle_column}>
             <div className={`${styles.rectangle} ${styles.rectangle_cross_industry}`}>
               <span>Cross-Industry KITs</span>
             </div>
             <div className={`${styles.rectangle} ${styles.rectangle_industry_core}`}>
               <span>Industry Core Foundation</span>
             </div>
             <div className={`${styles.rectangle} ${styles.rectangle_dataspace}`}>
               <span>Dataspace Foundation</span>
             </div>
           </div>
         </div>
       </div>
     </section>
   );
 }
 
 
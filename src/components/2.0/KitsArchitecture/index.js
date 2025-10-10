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
 
 export default function KitsArchitecture() {
   return (
     <section className={styles.architecture_section}>
       <div className={styles.container}>
         <h2 className={styles.title}>Our KITs Structure</h2>
         
         <div className={styles.diagram}>
           {/* Top row hexagons */}
           <div className={styles.hexagon_row}>
             <div className={styles.hexagon}>
               <div className={styles.hexagon_content}>
                 <div className={styles.hexagon_title}>Catena-X</div>
                 <div className={styles.hexagon_subtitle}>Automotive KITs</div>
               </div>
             </div>
             <div className={styles.hexagon}>
               <div className={styles.hexagon_content}>
                <div className={styles.hexagon_title}>Factory-X</div>
                 <div className={styles.hexagon_subtitle}>Shop Floor KITs</div>
               </div>
             </div>
             <div className={styles.hexagon}>
               <div className={styles.hexagon_content}>
                  <div className={styles.hexagon_title}>Semiconductor-X</div>
                 <div className={styles.hexagon_subtitle}>Semiconductor KITs</div>
               </div>
             </div>
             <div className={styles.hexagon}>
               <div className={styles.hexagon_content}>
                  <div className={styles.hexagon_title}>Aerospace-X</div>
                 <div className={styles.hexagon_subtitle}>Aerospace KITs</div>
               </div>
             </div>
             <div className={styles.hexagon}>
               <div className={styles.hexagon_content}>
                <div className={styles.hexagon_title}>+</div>
                 <div className={styles.hexagon_subtitle}>Other KITs</div>
               </div>
             </div>
           </div>

           {/* Bottom rectangles */}
           <div className={styles.rectangle_column}>
             <div className={styles.rectangle}>
               <span>Cross-Industry KITs</span>
             </div>
             <div className={styles.rectangle}>
               <span>Industry Core Foundation</span>
             </div>
             <div className={styles.rectangle}>
               <span>Dataspace Foundation</span>
             </div>
           </div>
         </div>
       </div>
     </section>
   );
 }
 
 
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

 import Link from "@docusaurus/Link";
 import styles from "./styles.module.scss";
 
 export default function KitsArchitecture({industries}) {
   return (
     <section className={styles.architecture_section}>
       <div className={`${styles.container}`}>
         <h2 className={`${styles.title}`}>Our KITs Architecture</h2>
         
         <p className={styles.subtitle}>Building the foundation for interoperable solutions across industries</p>
         
         {/* Interactive hint */}
         <div className={styles.interactive_hint}>
           <svg className={styles.hint_icon} width="14" height="14" viewBox="0 0 24 24" fill="none">
             <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
           <span>Click on the building blocks below to explore KITs by category</span>
         </div>
         
         <div className={styles.diagram}>
           {/* Top row hexagons */}
           <div className={styles.hexagon_row}>
             {industries.map((industry) => {
               const IconComponent = industry.icon;
               return (
                 <Link 
                   key={industry.id}
                   to={`/Kits/industry?id=${industry.id}&ref=architecture`}
                   className={`${styles.hexagon} ${styles.hexagon_industry}`}
                   style={{
                     '--hexagon-gradient': industry.gradient,
                     '--hexagon-title-gradient': industry.gradient.replace('135deg', '45deg'),
                   }}
                 >
                   <div className={styles.hexagon_content}>
                     <div className={styles.hexagon_title}>
                       {IconComponent && (
                         <IconComponent 
                           sx={{ 
                             fontSize: 60,
                           }} 
                         />
                       )}
                     </div>
                     <div className={styles.hexagon_subtitle}>{industry.name}</div>
                   </div>
                 </Link>
               );
             })}
             <div className={`${styles.hexagon} ${styles.hexagon_other}`}>
               <div className={styles.hexagon_content}>
                <div className={`${styles.hexagon_title} ${styles.other_title}`}>+</div>
                 <div className={styles.hexagon_subtitle}>Other Industries</div>
               </div>
             </div>
           </div>

           {/* Bottom rectangles */}
           <div className={styles.rectangle_column}>
             <Link to="/Kits/cross-industry" className={styles.rectangle_link}>
               <div className={`${styles.rectangle} ${styles.rectangle_cross_industry}`}>
                 <span>Cross-Industry Use Cases</span>
                 <div className={styles.rectangle_hover_indicator}>
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                     <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                 </div>
               </div>
             </Link>
             <Link to="/Kits/industry-core" className={styles.rectangle_link}>
               <div className={`${styles.rectangle} ${styles.rectangle_industry_core}`}>
                 <span>Industry Core Foundation</span>
                 <div className={styles.rectangle_hover_indicator}>
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                     <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                 </div>
               </div>
             </Link>
             <Link to="/Kits/dataspace-foundation" className={styles.rectangle_link}>
               <div className={`${styles.rectangle} ${styles.rectangle_industry}`}>
                 <span>Dataspace Foundation</span>
                 <div className={styles.rectangle_hover_indicator}>
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                     <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                 </div>
               </div>
             </Link>
           </div>
         </div>
         
         {/* Disclaimer positioned outside and below the diagram */}
         <div className={styles.disclaimer}>
           *All industry logos and trademarks are property of their respective organizations.
         </div>
         
         {/* Interactive CTA Button */}
         <div className={styles.button_container}>
           <Link to="/documentation/kit-framework" className={styles.explore_button}>
             <span className={styles.button_text}>Click here to explore more about KITs</span>
             <svg className={styles.button_icon} width="20" height="20" viewBox="0 0 24 24" fill="none">
               <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
             <div className={styles.button_glow}></div>
           </Link>
         </div>
       </div>
     </section>
   );
 }
 
 
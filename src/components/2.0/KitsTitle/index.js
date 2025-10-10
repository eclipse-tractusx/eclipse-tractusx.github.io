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
 import KitsCoreSvg from '@site/static/img/kits-2.0/tx-assembly-kit.svg'
 import styles from "./styles.module.scss";
 
 export default function KitsTitle() {
   return (
     <section className={styles.about_us}>
       <div className={styles.content_wrapper}>
         <div className={styles.maincontainer}>
            <div className={styles.top_title}>
              Power your Dataspace <strong>Adoption</strong> with one or more
            </div>
            <div className={styles.title}>
              <strong>Eclipse Tractus-X KIT</strong><span className={styles.title_s}>s</span>
            </div>
            <div className={styles.subtitle}>
              KIT = Keep it Together
            </div>
         </div>
        <div className={styles.image_container}>
           <KitsCoreSvg className={styles.svg}/>
         </div>
       </div>
     </section>
   );
 }
 
 
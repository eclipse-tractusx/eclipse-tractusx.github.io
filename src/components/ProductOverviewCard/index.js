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
import styles from "./styles.module.css";
 
export default function ProductOverviewCard({productName, productDescription, githubRepo, committers,mailTo}) {
  return (
    <div className={styles.card}>
			<div className={styles.title}>
				<h3>{productName}</h3>
			</div>

			<div className={styles.card_description}>
				<p>{productDescription}</p>
			</div>

			<div className={styles.subtitle}>
				<h4>GitHub</h4>
			</div>

			<hr/>
			
			<div className={styles.card_github}>
				<p>
					<strong>
						<a href={githubRepo}>
							To Repository &gt;
						</a>
					</strong>
				</p>
					<strong>Committers:</strong> <br/>
					<ul>
						{
							committers?.map((committer, index)=> {
								return (
									<li key={index}>{committer}</li>
								)
							})
						}
					</ul>		
			</div>

			<div className={styles.subtitle}>
				<h4>Contact</h4>
			</div>

			<hr/>

			<div className={styles.card_contact}>
				<h4>Email:</h4>
				<p>{mailTo}</p>
			</div>

			<div className={styles.version}>
		    <h3>Version: 1.0.0</h3>
			</div>	
    </div>
  );
}
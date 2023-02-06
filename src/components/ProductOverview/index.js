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
import ProductOverviewCard from "../ProductOverviewCard";

import styles from "./styles.module.css";
 
export default function ProductOverview() {
	const products = [
    {
        productName: "First Product Name",
        productDescription: "Lorem kfrk spofsfsm sifsif ilrfrfm oslwd holla Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et",
        githubRepo:  "leading-product-repo-link-one",
        committers: [
            "@githubhandle",
            "@anothergithubhandle,",
            "@anothergithubhandle,",

        ],
        mailTo: "mailto:dev-mailing?subject=abc"
    },
		{
			productName: "Second Product Name",
			productDescription: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, Lorem kfrk spofsfsm sifsif ilrfrfm oslwd holla coca cola kilo espantised diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et bla bla",
			githubRepo:  "leading-product-repo-link-two",
			committers: [
					"@githubhandle",
					"@anothergithubhandle,"
			],
			mailTo: "mailto:dev-mailing?subject=abc"
		},
		{
			productName: "Third Product Name",
			productDescription: "bla bla bla Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et",
			githubRepo:  "leading-product-repo-link-third",
			committers: [
					"@githubhandle",
					"@anothergithubhandle,"
			],
			mailTo: "mailto:dev-mailing?subject=abc"
		},
		{
			productName: "Fourth Product Name",
			productDescription: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et bla bla bla bla",
			githubRepo:  "leading-product-repo-link-fourth",
			committers: [
					"@githubhandle",
					"@anothergithubhandle,"
			],
			mailTo: "mailto:dev-mailing?subject=abc"
		},
	]

  return (
  	<section className={styles.product_overview}>
    	<div className={styles.container}>
				<div className={styles.product_box}>
					{products.map((product, index) => {
						return(
						<ProductOverviewCard key={index} {...product} />
						)
					})}
				</div>
    	</div>
   </section>
  );
}
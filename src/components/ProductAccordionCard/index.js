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

import React, { useState, useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import styles from "./styles.module.css";

export default function ProductAccordionCard({ productName, productDescription, githubRepo, committers, mailTo, hasBoard, subTitle, showVersion = false }) {
  const [release, setRelease] = useState()

  let furtherRepos = [...githubRepo]
  let leadingRepo = furtherRepos.splice(0, 1).toString()

  let owner = leadingRepo.split('/')[3]
  let repo = leadingRepo.split('/')[4]

  let emailAddress = mailTo.split('?')[0];

  // Defining max amount of characters that is been passed to condiotionally render the productDescription string
  const MAX_LENGTH = 175;

  // Fetching the latest release of passed leading repository and setting it as the "release" state 
  useEffect(() => {
    fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.html+json'
      }
    }).then((res) => res.json())
      .then((data) => {
        setRelease(data.name)
      })
      .catch(err => console.log(err))
  }, []);

  // Function that handles the "version string" in the product card
  const handleVersionString = (string) => {
    let str = string.toLowerCase()
    if (str.startsWith('v')) {
      return str.slice(1)
    } return str
  }

  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <>
      <div className={styles.product_accordion_card}>
        <Accordion
          expanded={accordionOpen}
          className={styles.accordion}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                style={{ cursor: 'pointer' }}
                sx={{ color: '#FAA023', fontSize: '2rem' }}
                onClick={() => setAccordionOpen(!accordionOpen)}
              />
            }
            sx={{ backgroundColor: '#000', color: '#fff', paddingBottom: '0.5rem', cursor: 'unset !important' }}
          >
            <section className={styles.summary_container}>
              <div className={styles.product_title_container}>
                <h2 className={styles.product_title}>{productName}</h2>
                {subTitle && (
                  <p className={styles.version}>{subTitle}</p>
                )}
                {showVersion && release != undefined ? (
                  <p className={styles.version}>Version:{handleVersionString(release)}</p>
                ) : (
                  <p className={styles.no_display}></p>
                )}
              </div>


              <div className={styles.repo_contact_container}>
                <ul className={styles.repo_contact_item}>
                  <li className={styles.item_title}>Leading Repository:</li>
                  <li className={styles.item_link}>
                    <a href={leadingRepo}>{leadingRepo.substring(19, (leadingRepo.length))}</a>
                  </li>
                </ul>
                {mailTo != '' && (
                  <ul className={styles.repo_contact_item}>
                    <li className={styles.item_title}>Contact:</li>
                    <li className={styles.item_link}>
                      <a href={`mailto:${mailTo}`}>
                        {emailAddress}
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </section>
          </AccordionSummary>
          <AccordionDetails
            sx={{ backgroundColor: '#000', color: '#fff', paddingBottom: '2rem' }}
          >
            <section className={styles.details_container}>
              <div className={styles.repo_details_container}>
                <ul className={styles.repo_contact_item}>
                  <li className={styles.item_title}>Further Repositories:</li>
                  {
                    furtherRepos.length > 0 ?
                      furtherRepos.map((repository, index) => {
                        return (
                          <li
                            key={index}
                            className={styles.item_link}
                          >
                            <a href={repository}>{repository.substring(19, (repository.length))}</a>
                          </li>
                        )
                      }) :
                      <li className={styles.no_more_content}>No more repositories</li>
                  }
                </ul>

                <ul className={styles.repo_contact_item}>
                  <li className={styles.item_title}>Committers:</li>
                  {
                    committers.length > 0 ?
                      committers.map((committer, index) => {
                        return (
                          <li
                            key={index}
                            className={styles.item_link}
                          >
                            <a href={committer}>{`@${committer.substring(19, (committer.length))}`}</a>
                          </li>
                        )
                      }) :
                      <li className={styles.no_more_content}>No committers provided</li>
                  }
                </ul>

                {
                  hasBoard ?
                    <ul className={styles.repo_contact_item}>
                      <li className={styles.item_title}>Board:</li>
                      <li className={styles.item_link}>
                        <a href={`${leadingRepo}/discussions`}>{`${leadingRepo.substring(19, (leadingRepo.length))}/discussions`}</a>
                      </li>
                    </ul> :
                    <ul className={styles.no_display}></ul>
                }

                <div className={styles.description_container}>
                  {
                    productDescription.length > MAX_LENGTH ?
                      <p className={styles.description}>{productDescription.substring(0, MAX_LENGTH)}...</p> :
                      <p className={styles.description}>{productDescription}</p>
                  }
                </div>
              </div>
            </section>
          </AccordionDetails>
        </Accordion>
      </div>

    </>
  );
}

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

export default function ProductAccordionCard({productName, productDescription, githubRepo, committers, mailTo}) {
  const [release, setRelease] = useState()
  let owner = githubRepo[0].split('/')[3]
  let repo = githubRepo[0].split('/')[4]
  
  let emailAddress = mailTo.split('?')[0];

  const MAX_LENGTH = 175;

  useEffect(() => {
  fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`,{
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
              style={{cursor: 'pointer'}} 
              sx={{color: '#FAA023', fontSize: '2rem'}}
              onClick={()=> setAccordionOpen(!accordionOpen)}
            />
          }
          sx={{backgroundColor: '#000', color: '#fff', paddingBottom: '0.5rem', cursor: 'unset !important'}}
        >
          <section className={styles.summary_container}>
            <div className={styles.product_title_container}>
              <h2 className={styles.product_title}>{productName}</h2>
              {
                release != undefined ? 
                <p className={styles.version}>Version:{handleVersionString(release)}</p> : 
                <p className={styles.empty}></p>
              }
            </div>

            <div className={styles.repo_contact_container}>
              <ul className={styles.repo_contact_item}>
                <li className={styles.item_title}>Leading Repository:</li>
                <li className={styles.item_link}>eclipse-tractusx/bpdm</li>
              </ul>

              <ul className={styles.repo_contact_item}>
                <li className={styles.item_title}>Contact:</li>
                <li className={styles.item_link}>
                  <a href={`mailto:${mailTo}`}>
                    {emailAddress}
                  </a>
                </li>
              </ul>
            </div>
        </section>
        </AccordionSummary>
        <AccordionDetails
          sx={{backgroundColor: '#000', color: '#fff', paddingBottom: '2rem'}}
        >
          <section className={styles.details_container}>
            <div className={styles.repo_details_container}>
              <ul className={styles.repo_contact_item}>
                <li className={styles.item_title}>Further Repositories:</li>
                {
                  githubRepo?.map((repository, index)=> {
                    return (
                      <li 
                        key={index}
                        className={styles.item_link}
                      >
                        <a href={repository}>{repository.substring(19, (repository.length))}</a>
                      </li>
                    )
                  })
                }
              </ul>

              <ul className={styles.repo_contact_item}>
                <li className={styles.item_title}>Committers:</li>
                {
                  committers?.map((committer, index)=> {
                    return (
                      <li 
                        key={index}
                        className={styles.item_link}
                      >
                        <a href={committer}>{`@${committer.substring(19, (committer.length))}`}</a>
                      </li>
                    )
                  })
                }
              </ul>

              <ul className={styles.repo_contact_item}>
                <li className={styles.item_title}>Board:</li>
                <li className={styles.item_link}>?</li>
              </ul>

              <div className={styles.description_container}>
                <p className={styles.description}>
                  {
                    productDescription.length > MAX_LENGTH ? 
                    <p>{productDescription.substring(0, MAX_LENGTH)}...</p> :
                    <p>{productDescription}</p>
                  }
                </p>
              </div>
            </div>
          </section>
        </AccordionDetails>
      </Accordion>
    </div>

    </>
  );
}

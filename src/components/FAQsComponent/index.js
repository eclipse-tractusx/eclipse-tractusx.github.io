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

import React, {useState} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { faqsContent } from "@site/utils/faqsContent";

import styles from "./styles.module.css";

export default function FAQsComponent() {
  const [expanded, setExpanded] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? [...expanded, panel] : expanded.filter((p) => p !== panel));
  };

  const handleToggleAll = () => {
    if (expanded.length === faqsContent.length) {
      setExpanded([]);
    } else {
      const panelIds = faqsContent.map((faq) => faq.id);
      setExpanded(panelIds);
    }
  };

  const isAllExpanded = expanded.length === faqsContent.length;

  return (
    <section className={styles.faqs}>
      <div className={styles.container}>
        <div className={styles.title_container}>
          <h2 className={styles.title}>FAQs</h2> 
        </div>

        <div className={styles.accordion_box}>
          {
            faqsContent.map((faq) => {
              return(
                <Accordion
                  key={faq.id} 
                  className={styles.accordion}
                  expanded={expanded.includes(faq.id)}
                  onChange={handleChange(faq.id)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: '#FAA023'}}/>}
                    aria-controls={`panel${faq.id}-content`}
                    id={`panel${faq.id}-header`}
                    sx={{backgroundColor: '#000', color: '#fff', paddingBottom: '1rem'}}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        lineHeight: '26px',
                        letterSpacing: '0.6px',
                      }}
                    >
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{backgroundColor: '#000', color: '#fff', paddingBottom: '2rem'}}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '14px',
                        lineHeight: '22px',
                        letterSpacing: '-0.4px'  
                      }}
                    >
                      {faq.answer}    
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              )
            })
          }
        </div> 

        <div className={styles.btn_container}>
          <button 
            className={styles.button}
            onClick={handleToggleAll}
          >
            {isAllExpanded ? "Close All" : "Open All"}
          </button>
        </div>
      </div>
    </section>
  );
}

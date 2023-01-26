import React, {useState} from "react";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import styles from "./styles.module.css";


export default function FAQsComponent() {
  const [toggleFirst, setToggleFirst] = useState(false)
  const [toggleSecond, setToggleSecond] = useState(false)
  const [toggleThird, setToggleThird] = useState(false)

  const openAllHandler = () => {
    if(toggleFirst === false || toggleSecond === false || toggleThird === false) {
      setToggleFirst(true)
      setToggleSecond(true)
      setToggleThird(true)
    }
    if(toggleFirst === true && toggleSecond === true && toggleThird === true) {
      setToggleFirst(false)
      setToggleSecond(false)
      setToggleThird(false)
    }
  }

  return (
    <section className={styles.faqs}>
      <div className={styles.container}>
        <div className={styles.title_container}>
          <h2 className={styles.title}>FAQs</h2> 
        </div>

        <div className={styles.accordion_box}>
          <Accordion 
            className={styles.accordion}
            expanded={toggleFirst}
            onClick={()=>{
              toggleFirst == false ? setToggleFirst(true) : setToggleFirst(false)
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{color: '#FAA023'}}/>}
              aria-controls="panel1a-content"
              id="panel1a-header"
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
                Why are there KITs and where does this naming comes from?
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
                KIT means “Keep It Together” - Catena-X KITs aim to accelerate the development of Catena-X applications and services and contribute significantly to the rapid scaling of the Catena-X ecosystem.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion 
            className={styles.accordion}
            expanded={toggleSecond}
            onClick={()=>{
              toggleSecond == false ? setToggleSecond(true) : setToggleSecond(false)
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{color: '#FAA023'}}/>}
              aria-controls="panel2a-content"
              id="panel2a-header"
              sx={{backgroundColor: '#000', color: '#fff', paddingBottom: '1rem'}}
            >
              <Typography
                 sx={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    lineHeight: '26px',
                    letterSpacing: '0.6px'
                  }}
              >
                Are there more KITs coming? 
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
                There are the first three lighthouse KITs available. More and more KITs will come from different domains. 
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion 
            className={styles.accordion} 
            expanded={toggleThird}
            onClick={()=>{
              toggleThird == false ? setToggleThird(true) : setToggleThird(false)
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{color: '#FAA023'}}/>}
              aria-controls="panel3a-content"
              id="panel3a-header"
              sx={{backgroundColor: '#000', color: '#fff', paddingBottom: '1rem'}}
            >
              <Typography
                 sx={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    lineHeight: '26px',
                    letterSpacing: '0.6px'
                  }}
              >
                Does every KIT contain the same things and follow the same structure? 
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
                KITs are guided with three different views (adoption, develop and operation) but not every KIT will provide the same objectives. Some will be more focused on the adoption view with a vision & mission, semantic model .. and other KITs will have a different target-group like developers - so there will be more focus on the technical specification.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div> 

        <div className={styles.btn_container}>
          <button 
            className={styles.button}
            onClick={openAllHandler}
          >
            {toggleFirst === false || toggleSecond === false || toggleThird === false ? 'Open All' :
            toggleFirst === true && toggleSecond === true && toggleThird === true ? 'Close All' : 'Open All'
            }
          </button>
        </div>
      </div>
    </section>
  );
}

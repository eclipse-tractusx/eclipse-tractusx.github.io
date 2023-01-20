import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import KitsHeader from "@site/src/components/KitsHeader";
import KitsCard from "@site/src/components/KitsCard";
import Adoption from "@site/docs/kits/Business Partner Kit/_adoption-view.md";

import KitBusinessSvg from '@site/static/img/kit_business_logo.svg'
import Benefits from "@site/static/img/benefits-min.png"
import BPDM from "@site/static/img/bpdm-card-min.png";

import styles from "./styles.module.css";


export default function AdoptionView() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={'Adoption View'}
      description="Description will go into a meta tag in <head />"
    >
      <KitsHeader 
        title="Business Partner Kit" 
        subtitle="Use BusinessParterKit in your app or service to get a high-quality data record including a unique identifier of business partners or to connect as a sharing member."
        SVG={KitBusinessSvg}
      />
      <main>
        <div className={styles.info_container}>
          <div className={styles.paragraph}>
            <Adoption />
          </div>
          <div className={styles.benefits}>
            <h2 className={styles.title}>Benefits</h2>
            <p className={styles.subtitle}>The three main benefits of using the BP KIT (Business Partner Kit).</p>
            <img src={Benefits} className={styles.img}/>
          </div>
        </div>
        <KitsCard 
          title="Explore the business partner data managment."
          subtitle="Especially the  Golden Records for business partners and the Value Added Services (VAS)."
          img={BPDM}
        />
      </main>
    </Layout>
  );
}

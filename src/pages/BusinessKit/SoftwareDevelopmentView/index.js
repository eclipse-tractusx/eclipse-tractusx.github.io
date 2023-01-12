import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import KitsHeader from "@site/src/components/KitsHeader";
import KitBusinessSvg from '@site/static/img/kit_business_logo.svg'

import styles from "./styles.module.css";

export default function SoftwareDevelopmentView() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={'Software Development View'}
      description="Description will go into a meta tag in <head />"
    >
      <KitsHeader
        title="Business Partner Kit" 
        subtitle="Use BusinessParterKit in your app or service to get a high-quality data record including a unique identifier of business partners or to connect as a sharing member."
        SVG={KitBusinessSvg}
      />
      <main>
        <div className={styles.container}>
          <div className={styles.info_container}>
            <h2 className={styles.title}>Specification</h2> 
            <p className={styles.subtitle}>The Business Partner Pool API offers access to business partner data with for other Catena-X
services. <br /> Swagger: <span style={{color: '#faa023'}}>https://partners-pool.int.demo.catena-x.net/ui/swagger-ui/index.html</span></p>
          </div>
        </div>
     
        <div className={styles.specification}>
        </div>
      </main>
    </Layout>
  );
}
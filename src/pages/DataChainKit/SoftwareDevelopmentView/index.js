import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import KitsHeader from "@site/src/components/KitsHeader";
import KitDataChainSvg from '@site/static/img/kit_data_chain_logo.svg'

import styles from "./styles.module.css";

export default function SoftwareDevelopmentView() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={'Software Development View'}
      description="Description will go into a meta tag in <head />"
    >
      <KitsHeader 
        title="Data Chain Kit" 
        subtitle="Use DataChainKit in your app / service to access connected data distributed  between organizations."
        SVG={KitDataChainSvg}
      />
      <main>
        <div className={styles.container}>
          <div className={styles.version_container}>
            <div className={styles.version_item}>
              <p className={styles.version_title}>Version <br/>
                <span className={styles.version_subtitle}>1.5.</span>
              </p>
            </div>
            <div className={styles.version_item}>
              <p className={styles.version_title}>Release Date <br/>
                <span className={styles.version_subtitle}>19/06/2022</span>
              </p>
            </div>
            <div className={styles.version_item}>
              <p className={styles.version_title}>Status <br/>
                <span className={styles.version_subtitle}>RELEASED</span>
              </p>
            </div>

            
          </div>
          <div className={styles.info_container}>
            <h2 className={styles.title}>
              IRS REST API
            </h2> 
            <p className={styles.subtitle}>
              The IRS Rest API provides an easy to use Interface for applications to access cross company data chains.
            </p>
          </div>

          <div className={styles.info_container}>
            <h2 className={styles.title}>
              IRS REST API Standart
            </h2> 
            <p className={styles.subtitle}>
              The IRS REST API is standardized through the Catena-X e.V. and can be found here: <br />
              <a href="/datachainkit/softwaredevelopmentview">
              &rarr; DC-001 Item Relationship Service
              </a>
            </p>
          </div>

          <div className={styles.info_container}>
            <h2 className={styles.title}>
              Specification
            </h2> 
            <p className={styles.subtitle}>
              The IRS REST API provides several functions via different endpoints. There is a Swagger-documentation available:<br />
              <a href="/datachainkit/softwaredevelopmentview">
              &rarr; Swagger Documentation
              </a>
            </p>
          </div>
        </div>
     
        <div className={styles.specification}>
        </div>
      </main>
    </Layout>
  );
}

import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import KitsHeader from "@site/src/components/KitsHeader";
import KitDataChainSvg from '@site/static/img/kit_data_chain_logo.svg'
import HelmChart from "@site/static/img/helm_chart.png";
import TestingChart from "@site/static/img/testing_service.png";

import styles from "./styles.module.css";
import clsx from "clsx";

export default function SoftwareOperationView() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={'Software Operation View'}
      description="Description will go into a meta tag in <head />"
    >
      <KitsHeader 
        title="Data Chain Kit" 
        subtitle="Use DataChainKit in your app / service to access connected data distributed  between organizations."
        SVG={KitDataChainSvg}
      />
      <main className={styles.software_view}>
      <div className={styles.container}>
          <div className={styles.info_container}>
            <h2 className={styles.title}>
              Helm Chart
            </h2>
            <p className={styles.subtitle}>
              Run a demo of the IRS with al the dependencies necessary. 
            </p>
            <div className={styles.img_container}>
              <img src={HelmChart}/>
            </div>
            <p className={clsx(styles.subtitle, styles.highlight)}>
              ADD STEPS / SCREENSHOT ANLEITUNG UM VON SETUP AUF DATA TRANSFER ZU KOMMEN. &rarr; LINK TO “TRANSFER DATA”
            </p>
          </div>

          <div className={styles.info_container}>
            <h2 className={styles.title}>
              Testing the Service
            </h2>
            <p className={styles.subtitle}>
              Retrieve Data from the API endpoint 
            </p>
            <p className={styles.subtitle}>
              Jump to the detailed description of every step 
              <br/><span style={{color: '#faa023'}}>here.</span>
            </p>
            <div className={styles.img_container}>
              <img src={TestingChart}/>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

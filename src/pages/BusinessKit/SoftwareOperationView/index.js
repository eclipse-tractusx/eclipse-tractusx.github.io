import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import KitsHeader from "@site/src/components/KitsHeader";
import KitBusinessSvg from '@site/static/img/kit_business_logo.svg'
import HowToRun from "@site/static/img/how-to-run-min.png";

import styles from "./styles.module.css";

export default function SoftwareOperationView() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={'Software Operation View'}
      description="Description will go into a meta tag in <head />"
    >
      <KitsHeader
        title="Business Partner Kit" 
        subtitle="Use BusinessParterKit in your app or service to get a high-quality data record including a unique identifier of business partners or to connect as a sharing member."
        SVG={KitBusinessSvg}
      />
      <main className={styles.software_view}>
      <div className={styles.container}>
          <div className={styles.info_container}>
            <h2 className={styles.title}>How to run</h2>
            <p className={styles.subtitle}>
              BPDM is a SpringBoot Kotlin software project managed by Maven. 
            </p>

            <div className={styles.img_container}>
              <img src={HowToRun}/>
            </div>

            <p className={styles.subtitle}>Detailed description on how to run this service can be found here:
            <br /><a href="https://github.com/eclipse-tractusx/bpdm/blob/main/README.adoc">https://github.com/eclipse-tractusx/bpdm/blob/main/README.adoc</a></p>
          </div>
        </div>
      </main>
    </Layout>
  );
}

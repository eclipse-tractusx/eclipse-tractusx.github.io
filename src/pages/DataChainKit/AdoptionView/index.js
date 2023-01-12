import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import KitsHeader from "@site/src/components/KitsHeader";
import KitsCard from "@site/src/components/KitsCard";
import Adoption from "@site/docs/kits/DataChain-Kit/adoption-view.md";

import KitDataChainSvg from '@site/static/img/kit_data_chain_logo.svg'
import WhyDataChain from "@site/static/img/why_data_chain-minified.png"
import IRS from "@site/static/img/irs-minified.png"
import IRSCard from "@site/static/img/irs-card-minified.png"

import styles from "./styles.module.css";


export default function AdoptionView() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={'Adoption View'}
      description="Description will go into a meta tag in <head />"
    >
      <KitsHeader 
        title="Data Chain Kit" 
        subtitle="Use DataChainKit in your app / service to access connected data distributed  between organizations."
        SVG={KitDataChainSvg}
      />
      <main>
        <div className={styles.info_container}>
          <div className={styles.paragraph}>
            <Adoption />
          </div>
          {/* <div className={styles.video}>
            <h2 className={styles.title}>Get inspired by using this KIT</h2>
            <p className={styles.subtitle}>
              The Video below shows you the easy access to distributed Data of Catena-X members; all based on the ConnectorKit. 
            </p>
            <iframe 
              width="100%" 
              height="315" 
              src="https://www.youtube.com/embed/FlvTmWZrix4" 
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div> */}
          <div className={styles.benefits}>
            <h2 className={styles.title}>Why Data Chain Kit</h2>
            <p className={styles.subtitle}>What is in for you to use the Data Chain Kit. On what is it built on. </p>
            <img src={WhyDataChain} className={styles.img}/>
          </div>
          <div className={styles.irs}>
            <h2 className={styles.title}>IRS Iterative</h2>
            <p className={styles.subtitle}>
              The IRS iterative iterates through the different digital twin aspects, which are representing a relationship. For Release 1 this is the AssemblyPartRelationship aspect, which connects serialized parts. This service can access the digital twins for which a EDC policy and and data contract exists. In this case the consumer needs a contract which each participant of the data chain.
            </p>
            <img src={IRS} className={styles.img}/>
            <p className={styles.subtitle}>
              The following general conditions apply:
              <ul>
                <li>
                  access control through policies and contracts is done by the EDC
                </li>
                <li>
                  direct data exchange between supply-chain partners
                </li>
                <li>
                  Catena-X partners of the accessible value chain are known to the data-consumer
                </li>
              </ul>
            </p>
          </div>
        </div>
        <KitsCard 
          title="IRS Success stories."
          subtitle="The following Use-Cases within Catena-X are building their Products on the Data Chain Kit. How and Why thei profit from the key benefits will be explained in the different success stories."
          img={IRSCard}
        />
      </main>
    </Layout>
  );
}

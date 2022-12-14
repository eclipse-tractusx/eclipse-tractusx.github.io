import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import AboutUsHeader from "../../components/AboutUsHeader";
import AboutUsContent from "../../components/AboutUsContent";

import styles from "./styles.module.css";


export default function AboutUsPage() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={'About Us'}
      description="Description will go into a meta tag in <head />"
    >
      <AboutUsHeader />
      <main>
        <AboutUsContent />
      </main>
    </Layout>
  );
}
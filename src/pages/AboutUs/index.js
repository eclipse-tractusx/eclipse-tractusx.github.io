import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import AboutUsHeader from "../../components/AboutUsHeader";

import styles from "./styles.module.css";

export default function AboutUsPage() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <AboutUsHeader />
      <main></main>
    </Layout>
  );
}
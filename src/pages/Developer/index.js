import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import DeveloperHeader from "../../components/DeveloperHeader";
import DeveloperContent from "../../components/DeveloperContent";

import styles from "./styles.module.css";


export default function DeveloperPage() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={'Developer'}
      description="Description will go into a meta tag in <head />"
    >
      <DeveloperHeader />
      <main>
        <DeveloperContent />
      </main>
    </Layout>
  );
}
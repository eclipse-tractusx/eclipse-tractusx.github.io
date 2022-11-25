import React from "react";
// import clsx from "clsx";
// import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import HomePageBanner from "../components/HomePageBanner/index";
import AboutUsCard from "../components/AboutUsCard";
import HowSubmitCard from "../components/HowSubmitCard";
import StayTunedCard from "../components/StayTunedCard";
import SurveyCard from "../components/SurveyCard";

import styles from "./styles.module.css";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomePageBanner />
      <main>
        <AboutUsCard />
        <HowSubmitCard />
        <StayTunedCard />
        <SurveyCard />
      </main>
    </Layout>
  );
}

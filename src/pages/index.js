import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import HomePageHeader from "../components/HomePageHeader/index";
import CarouselComponent from "../components/CarouselComponent";
import AboutUsCard from "../components/AboutUsCard";
import FAQsComponent from "../components/FAQsComponent";

import styles from "./index.module.css";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomePageHeader />
      <main>
        <AboutUsCard />
        <CarouselComponent />
        <FAQsComponent />
      </main>
    </Layout>
  );
}
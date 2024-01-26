---
title: End-to-End Adopter Journey
sidebar_position: 1
---

This set of tutorials covers the end to end journey of the IT department that operates the Catena-X stack for an adopter company (data provider / consumer).
This initial setup can be done without interaction with an external provider or operating company. This tutorial can be done in isolation as it is a local deployment only.

Completing this tutorial is recommended for IT departments prior to participating in Catena-X use-cases as the IT department needs to understand the basic technical concepts and their relation before they can begin to provide or consume data within a use-case.

:::info

With the Minimum Tractus-X Dataspace (MXD), IT departments can set up their own data space locally to perform a data exchange between two parties (Alice and Bob in our example). The MXD can be used as a sandbox for testing and exploring the EDC.

:::

## Target Audience

This tutorial is built for employees of the **IT department who operates the IT stack of an adopter (data provider/consumer)**. It shows how to operate the various Catena-X components in combination with each other. It also explains the basic connection with the core services (e.g. Keycloak and MIW), as provided by an operating company (e.g. first Catena-X Operating Company Confinity-X).

:::note

The related MXD doesn`t include all of the services, which are provided right now by an operating company. As the name says, right now its just a minmal set of services to learn and get in touch with the ecosystem dataspace.

:::

This tutorial is **not** designed for the following purposes:

- It is not designed for App Providers or Service Providers.
- It is not designed for adopters who only want to buy a business application or use fully managed services.
- It will not show you how to setup further develop Catena-X components.

:::tip

Please have a look into the the [Catena-X association homepage](<https://www.catena-x.net>) information for Application and Service Providers or the [Community](<https://eclipse-tractusx.github.io/community>) page of Tractus-X in case your are more interested in topics like App Providers and Service Providers, or if you want to participate in a business application.

:::

## Goal of this tutorial

This tutorial shall enable the IT department of an adopter (data provider/consumer) to operate the minimal Catena-X stack that is required to provide or consume data without business apps by understanding and implementing.

1. The separate technical components
2. Interfaces between components run at the adopter
3. Connection into the wider data space

During this tutorial you will get to know the perspective of a data provider as well as a data consumer and deploy the typical minimal components required.

:::info

In most use-cases and participation scenarios you will later use a business app for data consumption. This tutorial will nevertheless show you how the basic principles of data discovery and exchange behind the applications work.

:::

## Skills Required

No preliminary knowledge about Catena-X is required.

Technical knowledge (Docker, Kubernetes, Helm, Terraform) to deploy components onto a kubernetes cluster and interacting with them is advised. A detailed list of tools and their supported versions is given in the [prerequisites](./e2e/prerequisites/prerequisites.md).

## Tutorial Description

This tutorial is split into three chapters (more will follow) that build on each other. It won't provide deep dives into each of the technical components that will be deployed. If you are interested in getting a deeper understanding of each of the components, or the realted standards, please have a look into the [kits](https://eclipse-tractusx.github.io/developer) section.

:::tip

Within the kits you are able to switch the different released versions. In each adoption view, you will also find the related standards and reference implementations.

:::

### Chapter 1: Inform

Chapter 1: Inform shall give a you a first overview over all relevant Catena-X concepts and components and how they interrelate. Starting with references to high-level onboarding information and an architecture overview, this chapter finishes with a list of documents to deep dive into the various technical components.

### Chapter 2: Connect

Chapter 2: Connect describes step by step how you have to setup your (cloud) infrastructure including servers, a kubernetes cluster, networking and security. On this stack you will
deploy the components that you need for data provisioning and data consumption. Along with that you will deploy all the components that simulate the core service provider in our data space.

### Chapter 3: Boost

In Chapter 3: Boost you will configure and register your components so that they are discoverable in your local data space deployment. You will then take on the role of a data provider, build your first data pipeline, register your data at your decentral digital twin registry and create a contract offer in the EDC. As a data consumer you will discover the data that you have previously registered and initiate a data transfer. After completing this step, you have all the foundational knowledge you need to get started with active participation in a use-case.

## Outcome

After completing this tutorial you have all the foundational knowledge that you need to participate in a use-case. The use-case specific instructions build on top of this foundational knowledge.

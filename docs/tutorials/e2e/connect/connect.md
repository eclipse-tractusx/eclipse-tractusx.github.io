---
title: "Chapter 2: Connect"
sidebar_position: 4
---

This tutorial is designed for developers who want to get their hands dirty, for companies that want to perform data exchange in actual Catena-X data space infrastructure and generally for curious minds who want to explore dataspaces.

Required knowledge and skills:

- Beginner level docker and kubernetes
- Beginner level terraform
- Basic linux system commands

## Components & Architecture

By performing this tutorial a data space will be set up including the following components:

- 2 Tractus-X EDC Connectors (Called Bob and Alice). The EDC is the key component to exchanging data within data spaces.
- 1 Managed Identity Wallet. The Managed Identity Wallet (MIW) service is a central component storing technical identities. Connectors can request the identity, including properties, in order to take decisions if a contract-offer will be made, a contract agreement will be negotiated, or a data-exchange will be processed.
- 1 Keycloak instance. Keycloak is used for Identiy and Access Management of technical users.
- 1 Postgres data base. A data base building the foundation for the MXD setup.

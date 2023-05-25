---
title: Understand the architecture
sidebar_position: 2
---

---
**NOTE:**
This chapter is still work in progress. Check back layer!

---

If you are interested more in buying services, please get in contact with a operating company.
This section is for the makerr, which are intereste in deploying the services in their own it landscape.


**Where does the journey begin? / It Starts all with the BPN**

The first thing you need is a BPN because this is used within the Network to identify yourself against another paricipant. This tells the network in a trusted mannor who are you. [How to get your BPN?](https://eclipse-tractusx.github.io)

The next component to share data to another participant is the [Eclipse Data Space Connector](https://eclipse-tractusx.github.io) (EDC). With that component you are always in control of your data and it enables to be data sovereign. You are using the BPN's to also make shure, that you know who to share your data with. This must also be configured into your EDC.

Now the minimal Setup for data exchange is in place. Now you are able to setup data offers and exchange data.

**What language does Catena-X speak? / Asset Administration Shell with Aspect Models define the language in Catena-X**

Since Catena-X is more than just a data exchange the next level of ... is to exchange data in a structured and defined way. This helps to speak the same language, same syntax to enhance business value ... .
(Same language == greater value)
This is realized with [Asset Administration Shell](https://eclipse-tractusx.github.io) (Digital Twins) and Aspect models. The AAS is the vehicle to transport the semantic, which is modeled in Aspect Models.

With that you are able to speak Catena-X.

**Now the question is how can you find the Assets,the Data? / Wanna find Data? Digital Twin Registry is your Service of Choice**

The answer to that question is the so called digital twin registry. This is a service which enables the participants to ask the question, where is the information to for example some part and some specific data belonging to that part.
To enable this, the Data Offers of a Catena-X participants shall be registered in their respective [Digital Twin Registry](https://eclipse-tractusx.github.io). There fore each participant with a registry can provide the functionality to tell a data requestor where the data can be found.

**How to elaborate,"vergrößern" value along the Data Chain? / Build Value with the Network**

The [Item Relationship Service](https://eclipse-tractusx.github.io) (IRS) is one tool which can be used, to very easy access distributed linked Data within the Network. To enable Business Logic along the Data Chain. If you want to be the rocket within the network, the IRS is your Service to use!

@Jens

```mermaid
erDiagram
    BPN ||--|{ EDC : assinged
    REGISTRY ||--|| EDC: rel

```

- highlevel Architecture chart - building block view
  - EDC
  - BPN
  - AAS & Aspectmodelle (Digital Twins)
  - Registry
  - (IRS)

- Architecture principles in Scope of the Journey or Catena-X
  - Data Sovereignty
  - Interoperability

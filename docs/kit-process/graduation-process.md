---
title: Graduation Process
sidebar_position: 1
---

```md
    **********************************************
    ** DISCLAIMER                               **
    ** THIS PROCESS IS STILL UNDER DEVELOPMENT  **
    ** FEEDBACK IS APPRECIATED                  **
    **********************************************
```

At this point we describe the development process of a KIT. Since the KITs are to be developed in opensource we have decided to use the Graduation Process of the [cncf](https://www.cncf.io) in a slightly modified version. The goal is to track the progress of each kit and to achieve a certain level of quality.

## Stages

In our version we use three stages Sandbox, Incubating and Graduated. In each stage, different goals have to be achieved.

### Stage: Sandbox

In the Sandbox stage, the developers have identified a problem or have an idea on how to extend the usefulness of the data space to the community. They develop an solution for this problem together with a vison/mission.

### Stage: Incubating

In the next stage, the Incubating stage, the solution plan is implemented, and the developers must create various artifacts and deliverables required by the community. Once the KIT is promited to the incubating stage it must implement the defined [versioning scheme](versioning) starting with the version `0.0.0`.

### Stage: Graduated

In the final stage, the Graduated stage, the KIT is production ready, published and maintained by the community.

## Promotion Process

As described, a KIT passes through different stages. In order to be promoted from one level to the next, the developers must fulfill various criteria. For each stage, different artifacts and deliverables are defined that have to be completed. A distinction is made between mandatory (✓) and recommended ((✓)) deliverables. In order to be promoted to the next level, a kit must have completed all necessary items of the lower level and at least one necessary item of the following level. As soon as this criteria is met a promotion has to be requested. To achieve graduated status, additionaly a case study must be completed with a partner from the community. The aim of this case study is to verify the content of the KIT. The performing partner tries to solve the problem only with the help of the KIT and, if necessary, to make suggestions for improvement that have to be implemented.

## Artfacts & Deliverables

At this point we list the individual artifacts for each level. [here](artefacts) you will find the more detailed descriptions.

### Artefacts

| Artefact/Stage                                                           | Sandbox | Incubating |
| :----------------------------------------------------------------------- | :-----: | :--------: |
| [Vision/Mission](artefacts/#vision--mission)                             |    ✓    |     ✓      |
| [Business Value(s)](artefacts/#business-value)                           |    ✓    |     ✓      |
| [Use Case/ Domain explanation](artefacts/#use-case--domain-explanation)  |    ✓    |     ✓      |
| [Standarts](artefacts/#standards)                                        |         |     ✓      |
| [API-Specification/Protocols](artefacts/#api-specifications)             |         |     ✓      |
| [Logic/Schema](artefacts/#logic--schema)                                 |         |     ✓      |
| [Documentation](artefacts/#documentation-in-the-context-of-development)  |         |     ✓      |
| [Tutorials/Videos](artefacts/#tutorials)                                 |         |    (✓)     |
| [Semantic Models](artefacts/#semantic-models)                            |         |    (✓)     |
| [Buisiness Processes](artefacts/#business-process)                       |         |    (✓)     |
| [Sample Data](artefacts/#sample-data)                                    |         |    (✓)     |
| [Reference Implementation](artefacts/#reference-implementation)          |         |    (✓)     |
| Quick Setup Guide                                                        |         |    ✓ \*    |
| Architecture                                                             |         |    (✓)     |
| [Whitepaper](artefacts/#whitepaper)                                      |         |    (✓)     |

#### Legend

| Symbol |               Meaning                |
| :----: | :----------------------------------: |
|   ✓    |              mandatory               |
|  (✓)   |             recommended              |
|   \*   | if a reference implementation exists |

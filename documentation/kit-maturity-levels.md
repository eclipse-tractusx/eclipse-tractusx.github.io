---
title: KIT Maturity Levels
---
| Status     | Created      | Post-History                           |
|------------|--------------|----------------------------------------|
| Draft      | 04-Apr-2024  | Initial contribution                   |

## KIT Maturity Levels

KITs have a maturity level of **sandbox, incubating, or graduated.**
The maturity levels of KITs signals the quality, completeness and proof that the use case solves specific business problem and provides value to all stakeholders.
In order to be promoted from one level to the next, the developers must fulfill various criteria. For each stage, different artifacts and deliverables are defined that must be completed. A distinction is made between mandatory (✓) and recommended ((✓)) deliverables. In order to be promoted to the next level, a KIT must have completed all necessary items of the lower level and at least one necessary item of the following level. As soon as this criteria is met a promotion has to be requested. To achieve graduated status, additionally a case study must be completed with a partner from the community. The aim of this case study is to verify the content of the KIT. The performing partner tries to solve the problem only with the help of the KIT and, if necessary, to make suggestions for improvement that have to be implemented.

## Initiating a new KIT

To start a KIT or to be in Sandbox phase you could also be in one of two categories.
Option 1: High maturity. The reason to establish a KIT is clear, you have a scope and other interested companies in contributing to that KIT. Please go directly to Sandbox or Incubating stage.
Option 2: You have an idea and want to see if there is any relevance for this KIT. You still need to find other interested companies for contributing to this KIT:

1. Create a discussion in the SIG-Release repository under the "Ideas" category [SIG-Release repository - discussions](https://github.com/eclipse-tractusx/sig-release/discussions/categories/ideas ).
2. Provide information on the industry problem that this KIT will solve and the domain it should be placed in.
3. Seek feedback from the community and find other supporters (recommended four companies).
4. Wait for approval from corresponding committer, who will review the repository and new KIT requests./
Create request for new repository
Once approved, you can start with the Sandbox or move directly into Incubating.

## Sandbox Stage

First step is Sandbox stage. This is the starting point of the three stages for a KIT. A defined vision and mission, and business value should be clearly established. In perspective this is a preview of a dormant business innovation. (Please see the mandatory artifacts list).
Ensure the following steps have been addressed to be able to move onto the second phase: Most importantly, you need to be able to participate in open source.
[Getting started to contribute to Tractus-X](https://eclipse-tractusx.github.io/docs/oss/getting-started/)
If the KIT is directly ready to provide more than just a vision, mission and business value - than start directly with Incubating.

### Steps

- Step 1: Create an issue (template is available) within the following repository:[Tractus-X Github.io repository](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
- Step 2: Check for the list of mandatory facts of the Sandbox phase
- Step 3: Raise a pull request to the repository [Tractus-X Github.io repository](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
- Step 4: Your artifacts will undergo an approval phase, quality checks will be done by the committers thereafter the approval phase

## Incubating Stage

The incubation phase requires to establish a fully functioning open-source project. Incubating is the first released version of a KIT that can be used for development.
Steps of the Incubating phase:

- Step 1: Create an issue within the following repository:[Tractus-X Github.io repository](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)
- Step 2: Check for the list of mandatory artifacts for this stage
- Step 3: Raise a pull request to the repository ([Tractus-X Github.io repository](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io))
- Step 4: Your artifacts will undergo an approval phase, quality checks will be done by the committers thereafter the approval phase

## Artifacts

This an overview - for the details and examples please check the TRG 8.03 - KIT Artifacts.
Legend:
Mandatory ✓
Optional ✓ *

| Artifact / Stage  | Sandbox | Incubating | Graduated | Additional Info  |
|---|---|---|---|---|
|  Changelog |  | ✓ | ✓ |   |
|  Vision / Mission | ✓ | ✓ | ✓ |   |
| Business Value(s) | ✓  | ✓  | ✓ | Supposedly not relevant for Network Services |
| Use Case / Domain explanation | ✓  | ✓  | ✓ | Supposedly not relevant for Network Services |
| Notice  | ✓ | ✓ | ✓ |   |
| Standards  |  | ✓  | ✓  | |
| API-Specification / Protocols  |   | ✓ | ✓ |   |
| Logic / Schema  |  | ✓ | ✓ | Supposedly not relevant for Network Services |
| Documentation  |   | ✓ | ✓ |  |
| Tutorials / Videos  |   | ✓* | ✓* |   |
| Semantic Models  |   | ✓ | ✓ | Supposedly not relevant for Network Services |
| Business Processes  |   | ✓ | ✓ | Supposedly not relevant for Network Services  |
| Sample Data |  | ✓* | ✓* |   |
| Reference Implementation  |   | ✓* | ✓* |   |
| Quick Setup Guide  |  | ✓ | ✓ | Exception if you don´t have reference implementation |
| Architecture  |  | ✓ | ✓ | Exception if you don´t have reference implementation |
| Whitepaper  |   | ✓* | ✓* |   |

## Graduation Stage

How to graduate a KIT?
Graduation is the highest quality level to achieve, all the artifacts in the table above should be completed. It has passed expert testing and been approved. Thereafter, please follow the next steps in how to graduate a KIT.

### Step 1: Raise a issue to graduate

[KIT issue](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/issues)
You should provide information such as;

1. KIT owner’s email address
2. Solution provider / Developer’s email address
3. The KIT name

### Step 2: Kick off meeting

1. Introduction into the graduation process
2. What problems / challenges are you facing at the moment?
3. Why is the development of this KIT so relevant for you? What opportunities do you see?
4. What is in the Kick off meeting? (need to make the process slides : agenda so on)
   1. Introduction of the people (adopter and developer)
   2. Basic overview of the KIT (KIT-expert)
   3. Process of the Graduation
   4. Arrange two touch point meetings
   5. Send out the feedback survey

### Step 3: Start execution

The solution provider starts on working with the KIT.

### Step 4: Touch point meetings

1st Touch point meeting (1 week after start of the execution)

1. How long did it take to find the relevant information?
2. What do you think should be the next thing to add to help your development to become easier and faster?
3. Do you find the navigation through the pages user friendly? If not, how would you change the structure?
4. Do you think your expected time frame will be met? If not, how much more time do you expect until completion?
2nd touch point meeting (2,5 weeks after start)
1.What were some of the difficulties faced when an outsider company tested it? If there were any.
2.What are some additional remarks from the outside company testing that you would like to share with us?

### Step 5: Feedback (survey and meeting)

1. Why did you decide to participate in the KIT study?
2. What were the objectives that needed to be met?
3. What were your expectations?
4. How long did it take you?
5. How many FTEs did you need to integrate your service?
6. Do you need other functions on the API?
7. What major technical difficulties did you face during your tasks to prepare, register and get data?
8. Where there any organizational challenges? If so, what were they?
9. Anything else you would like to share with us?

### Step 6: closing meeting

Gathered information thus far. A presentation of the main points validating the KIT (summary presentation)

### Step 7: Validation

### Step 8: Publication

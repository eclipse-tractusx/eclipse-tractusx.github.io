/*********************************************************************************
 * Copyright (c) 2026 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

/**
 * Questions and answers of the About Us FAQ page (/AboutUs/faq).
 *
 * ---------------------------------------------------------------------------
 * HOW TO ADD A QUESTION
 * ---------------------------------------------------------------------------
 * Append an entry to the `questions` array of a category:
 *
 *   {
 *     id: 'short-kebab-case-id',     // stable, used as the URL hash (#id)
 *     question: 'The question?',
 *     answer: [                      // one string per paragraph
 *       'Text with a [link](/docs/getting-started) inside.',
 *     ],
 *   }
 *
 * Links use the Markdown form `[text](url)`: internal paths (starting with
 * `/`) and `https://` or `mailto:` URLs. Keep answers short, and link to the
 * page that explains the topic in full instead of repeating it here.
 * Every answer should be backed by a page of this site or by the Eclipse
 * Foundation, so the FAQ stays correct when those pages change.
 */

/**
 * @typedef {Object} FaqQuestion
 * @property {string} id - Unique across all categories; the anchor of the question.
 * @property {string} question
 * @property {string[]} answer - Paragraphs; may contain `[text](url)` links.
 *
 * @typedef {Object} FaqCategory
 * @property {string} id - Unique; the anchor of the category.
 * @property {string} title
 * @property {string} description - One line under the category title.
 * @property {FaqQuestion[]} questions
 */

/** @type {FaqCategory[]} */
export const faqCategories = [
  {
    id: 'about-the-project',
    title: 'About the project',
    description: 'What Eclipse Tractus-X is, where it comes from and who is behind it.',
    questions: [
      {
        id: 'what-is-eclipse-tractus-x',
        question: 'What is Eclipse Tractus-X?',
        answer: [
          'Eclipse Tractus-X™ is an open-source project of the Eclipse Foundation. Contributors from different organizations, open-source projects, industry initiatives and independent companies develop the software and knowledge needed for secure, sovereign and interoperable data exchange in dataspaces.',
          'Learn more about the community on the [About Us](/AboutUs) page.',
        ],
      },
      {
        id: 'relation-to-catena-x',
        question: 'How is Eclipse Tractus-X related to Catena-X?',
        answer: [
          'Eclipse Tractus-X started in the automotive industry. In 2023, the Catena-X consortia, with 32 partners from the automotive industry, made the initial contribution to the project and placed the foundations of the automotive dataspace in open source.',
          'Today the Catena-X Association brings industry requirements, standards alignment and the Catena-X use-case ecosystem, while the shared software and KITs are developed in the open in Eclipse Tractus-X. See [our history](/AboutUs#history-title).',
        ],
      },
      {
        id: 'only-automotive',
        question: 'Is Eclipse Tractus-X only for the automotive industry?',
        answer: [
          'No. At the end of 2025 the project scope officially extended beyond the automotive industry and Catena-X. Initiatives such as Factory-X, Semiconductor-X and Construct-X collaborate in the project; the scope of each initiative’s involvement varies.',
          'In February 2026, Factory-X contributed its open-source code and use-case deliverables, so Manufacturing-X working groups and other -X initiatives can build on them. See [our ecosystem](/AboutUs#ecosystem-title).',
        ],
      },
      {
        id: 'governance',
        question: 'Who governs the project?',
        answer: [
          'Eclipse Tractus-X operates under the Eclipse Foundation’s development process and intellectual property policies. It is part of the Eclipse automotive top-level project, whose Project Management Committee (PMC) approves committer and project lead elections as well as release and graduation reviews.',
          'Committers decide what goes into the code base, and project leads are elected by the committers. The current lists are on the [Eclipse project page](https://projects.eclipse.org/projects/automotive.tractusx/who); our [summary of the project roles](/docs/oss/contributor-committer) explains what each role does.',
        ],
      },
      {
        id: 'license',
        question: 'Can I use the software for free?',
        answer: [
          'Yes. The project uses the Apache License 2.0 for code and Creative Commons Attribution 4.0 (CC-BY-4.0) for non-code content such as documentation, so you can use, adapt and build on it under the terms of these licenses.',
        ],
      },
    ],
  },
  {
    id: 'technology-and-kits',
    title: 'Technology & KITs',
    description: 'The software we build, the KITs and how releases work.',
    questions: [
      {
        id: 'what-does-tractus-x-build',
        question: 'What software and tools does Eclipse Tractus-X build?',
        answer: [
          'Reference implementations, libraries, demonstrators and services for dataspaces. These include connectors such as Tractus-X EDC, identity components, the Digital Twin Registry, the Portal, the Industry Core Hub and solutions for traceability, sustainability and supply chains.',
          'We also build tools that make it easier to develop, test and run these components: the Tractus-X SDK, a middleware that simplifies building applications on top of the connector, the Digital Twin Registry and data sources; the [Tractus-X Umbrella Helm Chart](https://github.com/eclipse-tractusx/tractus-x-umbrella) for local test and sandbox environments; the testdata-provider; and tooling to build semantic models.',
          'Browse all of them in the [product overview](/community/products).',
        ],
      },
      {
        id: 'use-in-production',
        question: 'Can I use Eclipse Tractus-X in production?',
        answer: [
          'Yes, but check the maturity of each component first. Some components are ready and used in production today, for example Tractus-X EDC. Others are newer or still in development and have a different maturity level. The [product overview](/community/products) and the [KIT Lifecycle](/documentation/kit-lifecycle) help you see where a component or KIT stands.',
          'Using open-source software in production is always at your own risk. The software is provided “as is”, without warranties, under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0), and open-source communities are not liable when the operation of the software goes wrong. You, or the provider you work with, are responsible for operating it.',
          'What the community does make sure of is that the software is safe, performant and easy to use, following the [Release Guidelines](/docs/release) and testing every release end to end. Many KITs also provide an Operation View with guidelines for running them in production.',
        ],
      },
      {
        id: 'what-is-a-kit',
        question: 'What is a KIT?',
        answer: [
          'KIT is short for “Keep It Together”. A KIT is an open-source toolbox with comprehensive documentation that helps business teams, solution providers and developers build interoperable applications compatible with the Eclipse Tractus-X dataspace technologies, from architecture guidance and API specifications to reference implementations.',
          'Start with [KIT Getting Started](/documentation/kit-getting-started) or explore [all KITs](/Kits).',
        ],
      },
      {
        id: 'kit-maturity',
        question: 'How do I know how mature a KIT is?',
        answer: [
          'Every KIT has a lifecycle level: Sandbox for new ideas, Incubating while it is actively developed (with the sub-states Draft, In Progress and In Review) and Graduated once it has passed testing, expert validation and real-world case studies. KITs that are no longer maintained are marked Deprecated.',
          'The [KIT Lifecycle](/documentation/kit-lifecycle) page explains the criteria of each level.',
        ],
      },
      {
        id: 'other-eclipse-projects',
        question: 'How does Tractus-X work with other open-source projects?',
        answer: [
          'Eclipse Tractus-X collaborates with other Eclipse projects such as Eclipse Dataspace Components and Eclipse BaSyx, which provide reusable dataspace and digital twin technology. It also participates in the wider Eclipse dataspace ecosystem through the [Eclipse Dataspace Working Group](https://dataspace.eclipse.org/about/).',
        ],
      },
      {
        id: 'try-it-locally',
        question: 'How can I try the components myself?',
        answer: [
          'The [tutorials](/docs/tutorials) show how to run the components. The [Tractus-X Umbrella Helm Chart](https://github.com/eclipse-tractusx/tractus-x-umbrella) deploys a set of Tractus-X components into a local Kubernetes cluster, as a basis for end-to-end tests or a sandbox environment.',
          'For developers, the [Developer Hub](/docs/developer) collects further guides and links.',
        ],
      },
      {
        id: 'release-cadence',
        question: 'How often is Eclipse Tractus-X released?',
        answer: [
          'Tractus-X follows a quarterly release cycle, with releases typically in March, June, September and December. Releases are named R{YY}.{MM}, for example R24.03 for March 2024.',
          'Read how a release is planned and tested in the [release process](/docs/oss/release-process), and what changed in the [changelog](/blog-changelog).',
        ],
      },
    ],
  },
  {
    id: 'community-and-contributing',
    title: 'Community & contributing',
    description: 'How to join, ask questions and contribute.',
    questions: [
      {
        id: 'who-can-contribute',
        question: 'Who can contribute?',
        answer: [
          'Anyone who wants to. Companies, institutions and individual contributors take part. Contributing is more than code: documentation, opening and solving issues and answering questions on the public channels all count.',
          'See the ways to take part on our [contribution page](/Contribute).',
        ],
      },
      {
        id: 'how-to-start-contributing',
        question: 'How do I start contributing?',
        answer: [
          'You need a GitHub account with two-factor authentication and an Eclipse Foundation account with the same email address. Sign the [Eclipse Contributor Agreement (ECA)](https://www.eclipse.org/legal/ECA.php) and add your GitHub ID to your Eclipse profile. Without these accounts you only have read access.',
          'The [Getting Started](/docs/getting-started) guide walks you through every step.',
        ],
      },
      {
        id: 'project-roles',
        question: 'What is the difference between a contributor and a committer?',
        answer: [
          'Everybody with an Eclipse account and a signed ECA is a contributor. Official project contributors get the triage role on GitHub, so they can for example label, assign and close issues and pull requests. Committers have write access, review contributions and decide what goes into the code base; becoming a committer requires a demonstration of merit and an election.',
          'Read more about the [Eclipse project roles](/docs/oss/contributor-committer) and the [committer election process](/docs/oss/committer-election-process).',
        ],
      },
      {
        id: 'where-to-ask-questions',
        question: 'Where can I ask questions?',
        answer: [
          'For quick questions, join the [Tractus-X Matrix space](https://chat.eclipse.org/#/room/#automotive.tractusx:matrix.eclipse.org). For a first contact with the community or a product team, write to the developer mailing list [tractusx-dev@eclipse.org](mailto:tractusx-dev@eclipse.org).',
          'You can also meet the community in the [open meetings](/community/open-meetings), for example the weekly Community Office Hour on Fridays or the NewJoiner Office Hour.',
        ],
      },
      {
        id: 'report-a-bug',
        question: 'How do I report a bug or suggest a feature?',
        answer: [
          'Open an issue in the GitHub repository of the component. Working in public issues keeps development open and transparent, and documents decisions for everyone. See [how to use the issue trackers](/docs/oss/issues).',
          'Features for an upcoming release are planned together on the open [release planning board](https://github.com/orgs/eclipse-tractusx/projects/26).',
        ],
      },
      {
        id: 'what-are-trgs',
        question: 'What are the Tractus-X Release Guidelines (TRGs)?',
        answer: [
          'The TRGs are the project’s shared defaults for workflows and requirements, for example on documentation, containers, Helm charts, security and open-source governance. They make it easier to contribute to, maintain and run components across Eclipse Tractus-X, and features of a release must follow them.',
          'Browse all [Release Guidelines](/docs/release).',
        ],
      },
      {
        id: 'community-bases',
        question: 'Where in the world is the community?',
        answer: [
          'All over the world. The [Community Bases](/CommunityBases) map shows the countries where the project has an established community presence, with the contributors, committers, adopters and partner organizations that build, run and promote Tractus-X locally.',
        ],
      },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    description: 'How we keep the software and its supply chain secure, and how to report a vulnerability.',
    questions: [
      {
        id: 'security-approach',
        question: 'How does Eclipse Tractus-X take care of security?',
        answer: [
          'Security is built into how we develop and release software, not added at the end. Every feature of a release must follow the [Tractus-X Release Guidelines (TRGs)](/docs/release), and several of them are about security: automated security scans, hardened containers and Helm charts, checks of third-party content and a security policy in every repository.',
          'All code changes go through pull requests, and every pull request is reviewed, first for content by the product team and then by a committer. See the [code review guidelines](/docs/oss/code-reviews). Before each release, the components are tested together in an end-to-end test phase, described in the [release process](/docs/oss/release-process).',
        ],
      },
      {
        id: 'security-scans',
        question: 'Which security scans run on the repositories?',
        answer: [
          '[CodeQL](/docs/release/trg-8/trg-8-01) analyzes the source code for vulnerabilities. [KICS](/docs/release/trg-8/trg-8-02) checks infrastructure as code, such as Kubernetes files, Helm charts and GitHub Actions. [TruffleHog](/docs/release/trg-8/trg-8-03) searches the whole repository history for leaked secrets such as passwords and API keys. [Trivy](/docs/release/trg-8/trg-8-04) scans the published container images, and [Dependabot](/docs/release/trg-8/trg-8-05) keeps dependencies, base images and GitHub Actions up to date.',
          'The scans run on pull requests and at least once a week, so new vulnerabilities in existing code are found too. Findings appear in the GitHub security dashboard, and high-severity findings may only be dismissed with a justification.',
        ],
      },
      {
        id: 'secure-containers',
        question: 'How are the container images and Helm charts hardened?',
        answer: [
          'Containers build on [official, regularly scanned base images](/docs/release/trg-4/trg-4-02), run as a [non-root user](/docs/release/trg-4/trg-4-03) and are encouraged to use a [read-only root filesystem](/docs/release/trg-4/trg-4-07), so unprivileged access cannot be abused to install malicious software.',
          'Helm charts make security-relevant settings such as TLS, signing keys and secrets configurable, and ship secrets with empty values instead of defaults. See the [application configuration guideline](/docs/release/trg-5/trg-5-06).',
        ],
      },
      {
        id: 'supply-chain-security',
        question: 'How is the software supply chain protected?',
        answer: [
          'All third-party content, such as libraries, is checked and approved by the Eclipse Foundation IP team, for example with the Eclipse Dash License Tool, and documented in the NOTICE or DEPENDENCIES file. See [IP checks for third-party content](/docs/release/trg-7/trg-7-04).',
          'Contributors need a GitHub account with two-factor authentication and a signed [Eclipse Contributor Agreement](https://www.eclipse.org/legal/ECA.php), and only elected committers can merge changes. Repositories that are no longer maintained or no longer meet the guidelines, including the security guidelines, are [archived](/docs/release/trg-7/trg-7-09).',
        ],
      },
      {
        id: 'report-a-vulnerability',
        question: 'How do I report a security vulnerability?',
        answer: [
          'Please do not report vulnerabilities in public GitHub issues. Open the Security tab of the affected repository and choose “Report a vulnerability” to create a private GitHub security advisory. In severe cases you can also contact the [Eclipse Foundation Security Team](https://www.eclipse.org/security/).',
          'Every repository explains this in its SECURITY.md file, which the [legal documentation guideline (TRG 7.01)](/docs/release/trg-7/trg-7-01) requires.',
        ],
      },
    ],
  },
];

/** All questions of all categories, in page order. */
export const faqQuestions = faqCategories.flatMap((category) => category.questions);

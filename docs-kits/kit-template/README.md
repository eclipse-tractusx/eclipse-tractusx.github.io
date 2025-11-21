# KIT Template

## Remove this file before publishing

This directory contains the comprehensive template structure for creating a new KIT (Keep It Together) in the Eclipse Tractus-X ecosystem.

## Quick Start

### Prerequisites

Before creating a new KIT, ensure you have:

- A clear understanding of the business problem your KIT addresses
- Familiarity with the [KIT Framework Documentation](https://eclipse-tractusx.github.io/documentation/kit-framework)
- Read the [TRG 10.01 - KIT Architecture](/docs/release/trg-10/trg-10-01)
- Read the [TRG 10.02 - KIT Content Structure](/docs/release/trg-10/trg-10-02)
- Reviewed existing KITs for reference at [Eclipse Tractus-X KITs](https://eclipse-tractusx.github.io/Kits)

### How to Use This Template

Follow these steps to create your KIT:

#### 1. **Copy and Rename**
```bash
# From the docs-kits/kits/ directory
cp -r ../kit-template ./your-kit-name-kit
cd your-kit-name-kit
```

#### 2. **Update Placeholders**
Search and replace all `[PLACEHOLDER]` text with your KIT-specific information:
- `[KIT_NAME]` → Your KIT's official name
- `[DESCRIPTION]` → Brief description of your KIT
- `[YOUR_COMPANY]` → Your company name
- `[YYYY]` → Current year
- `[GITHUB_USERNAME]` → Your GitHub username

#### 3. **Select Your Views**
Based on your KIT's maturity level, implement the required views:
- **Sandbox**: Minimum - Adoption View
- **Incubating**: Adoption + Development Views
- **Graduated**: All Views (Adoption + Development + Operations + Industry Extensions)

#### 4. **Update Master Data**
Register your KIT in `/data/kitsData.js`:
- Add KIT metadata (name, description, logo, routes)
- Assign to appropriate category (Foundation, Industry Core, Cross-Industry, Industry-Specific)
- Follow the [JSON schema](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/utils/schemas/kitsData.schema.json)

#### 5. **Configure Sidebar**
Add your KIT to `/sidebarsDocsKits.js` to make it navigable

#### 6. **Set Code Owners**
Add maintainers to `/.github/CODEOWNERS`:
```
/docs-kits/kits/your-kit-name-kit/ @your-github-username
```

## Directory Structure

```
kit-template/
├── README.md                    # Main guide - START HERE
├── CHANGELOG.md                 # Version history template
├── CODEOWNERS                   # Maintainer assignments template
│
├── adoption-view/               # Business documentation (MANDATORY for all)
│   ├── _category_.json
│   └── adoption-view.md         # Vision, mission, business value, use cases
│
├── development-view/            # Technical documentation (Required for Incubating+)
│   ├── _category_.json
│   └── development-view.md      # Architecture, APIs, semantic models
│
├── operations-view/             # Operations documentation (Required for Graduation)
│   ├── _category_.json
│   └── operations-view.md       # Deployment, monitoring, security
│
├── industry-extensions/         # Industry-specific adaptations (Required for Graduation)
│   ├── _category_.json
│   ├── README.md                # Overview of industry extensions
│   └── automotive/              # Example: Automotive industry extension
│       ├── _category_.json
│       └── overview.md          # Catena-X standards, automotive models
│
├── success-stories/             # Reference implementations (Recommended for Graduation)
│   ├── _category_.json
│   └── overview.md              # Case studies, reference implementations
│
├── documentation/               # Additional resources (Optional)
│   ├── _category_.json
│   └── overview.md              # External links, glossary, FAQ
│
└── assets/                      # Images, diagrams, files
    ├── kit-banner.svg
    └── kit-logo.svg
```
```

## Maturity Levels

Your KIT will progress through different maturity levels, each with specific requirements:

### Sandbox

Initial development phase with basic structure

**Required Artifacts:**

- CHANGELOG.md
- Copyright notices in all files
- Adoption View (Vision, Mission, Business Value, Use Case)

### Incubating

Active development with growing feature set

**Required Artifacts:**

- All Sandbox requirements
- Development View (Architecture, APIs, Semantic Models)
- Standards documentation
- Business Process documentation
- Test cases
- Code Owner (recommended)

**Incubating Sub-states:**

- **Draft**: Initial structure and documentation
- **In Progress**: Active implementation of features
- **In Review**: Expert review and quality assurance

### Graduated

Production-ready with complete documentation

**Required Artifacts:**

- All Incubating requirements
- Operations View (Deployment, Monitoring, Security)
- Industry Extensions (at least one)
- Reference Implementation
- Sample Data
- Code Owner (mandatory)
- Success Stories (recommended)

For detailed artifact requirements, see [TRG 10.03 - KIT Lifecycle](/docs/release/trg-10/trg-10-03).

## Required Files by Maturity Level

### Mandatory for All Maturity Levels

| File/Artifact | Description | Reference |
|---------------|-------------|-----------|
| `CHANGELOG.md` | Version history following semantic versioning | [TRG 1.03](/docs/release/trg-1/trg-1-03) |
| Copyright Notice | CC-BY-4.0 license in **every file** | [TRG 7.07](/docs/release/trg-7/trg-7-07), [TRG 7.08](/docs/release/trg-7/trg-7-08) |
| Adoption View | At minimum: vision, mission, business value | [TRG 10.02](/docs/release/trg-10/trg-10-02) |

### Required for Graduation

| File/Artifact | Description | Reference |
|---------------|-------------|-----------|
| `CODEOWNERS` | Maintainer assignments | [TRG 10.02](/docs/release/trg-10/trg-10-02) |
| Development View | Complete technical documentation | [TRG 10.02](/docs/release/trg-10/trg-10-02) |
| Operations View | Deployment and operations guides | [TRG 10.02](/docs/release/trg-10/trg-10-02) |
| Industry Extensions | At least one industry implementation | [TRG 10.02](/docs/release/trg-10/trg-10-02) |
| Reference Implementation | Working COTS or OSS implementation | [TRG 10.04](/docs/release/trg-10/trg-10-04) |
| Test Cases | Validation and testing documentation | [TRG 10.03](/docs/release/trg-10/trg-10-03) |

## Documentation Guidelines

### Adoption View

**Target Audience:** Business stakeholders, decision-makers, non-technical users

**Focus:** Business value, use cases, and strategic benefits

**Required Content:**

- **Vision & Mission**: Strategic objectives and inspiration for solution providers
- **Business Value**: 3-5 key benefits with descriptions (ROI, cost savings, market access)
- **Use Case Explanation**: Industry problem, current challenges, and benefits by stakeholder type
- **Business Processes**: Process flows, access policies, and data sovereignty considerations
- **Semantic Models**: Data structure definitions for interoperability
- **Standards**: Industry standards and compliance requirements
- **Tutorials** (Optional for Sandbox/Incubating): Videos or step-by-step guides

**Best Practices:**

- Use clear, non-technical language
- Include visual diagrams and flowcharts
- Provide real-world examples
- Highlight competitive advantages
- Show value from multiple stakeholder perspectives (OEM, SME, Solution Provider)

### Development View

**Target Audience:** Software developers, architects, technical implementers

**Focus:** Technical implementation, APIs, and development resources

**Required Content:**

- **Architecture Overview**: System design, components, and architectural patterns
- **Component/Sequence Diagrams**: Visual representations of system interactions
- **API Specifications**: OpenAPI/Swagger files with endpoint documentation
- **Standards**: Technical standards and protocol compliance
- **Logic/Schema**: Business logic definitions and data flow diagrams
- **Semantic Models**: Detailed data structures and relationships
- **Test Cases**: Unit tests, integration tests, and validation scenarios
- **Sample Data**: Example datasets and payloads
- **Tutorials**: Developer quick-start guides and code examples

**Best Practices:**

- Include working code examples
- Provide API endpoint examples with request/response samples
- Document error handling and edge cases
- Include architecture diagrams (C4, UML, etc.)
- Link to live API documentation
- Provide sample data in multiple formats (JSON, XML, CSV)

### Operations View

**Target Audience:** DevOps engineers, system administrators, operators

**Focus:** Deployment, operations, and maintenance

### Industry Extensions

**Target Audience:** Industry-specific implementers

**Focus:** Industry-specific adaptations while maintaining core interoperability

**Required Content:**

- **Industry Overview**: Specific industry context and requirements
- **Industry Standards**: Compliance with industry-specific standards (e.g., Catena-X, IDTA, ISO/DIN)
- **Semantic Models**: Industry-specific data models and extensions
- **Use Cases**: Industry-specific scenarios and implementations
- **Code Owner**: Industry extension maintainer(s)

## Implementation Checklist

### Phase 1: Setup (Sandbox)

- [ ] Copy template directory to `/docs-kits/kits/your-kit-name-kit/`
- [ ] Update README.md with KIT-specific information
- [ ] Create CHANGELOG.md with initial version
- [ ] Add copyright notices to all files
- [ ] Implement basic Adoption View (vision, mission, business value)
- [ ] Create KIT logo and banner in `/assets/`
- [ ] Register KIT in `/data/kitsData.js`
- [ ] Add sidebar configuration in `/sidebarsDocsKits.js`
- [ ] Create initial GitHub issue in [sig-release](https://github.com/eclipse-tractusx/sig-release)

### Phase 2: Development (Incubating)

- [ ] Complete Adoption View documentation
- [ ] Implement Development View structure
- [ ] Document architecture and components
- [ ] Create API specifications (OpenAPI)
- [ ] Document semantic models and data structures
- [ ] Add business process documentation
- [ ] Create developer tutorials
- [ ] Implement test cases
- [ ] Add sample data
- [ ] Document standards compliance
- [ ] Set recommended code owner in CODEOWNERS

### Phase 3: Production (Graduated)

- [ ] Complete Operations View documentation
- [ ] Create deployment guides and scripts
- [ ] Document monitoring and security
- [ ] Implement at least one Industry Extension
- [ ] Add reference implementations
- [ ] Document success stories
- [ ] Set mandatory code owner in CODEOWNERS
- [ ] Complete expert review process
- [ ] Submit graduation request in [sig-release](https://github.com/eclipse-tractusx/sig-release)

## Compliance Requirements

Your KIT **MUST** comply with these Tractus-X Release Guidelines (TRGs):

| TRG | Title | Requirement |
|-----|-------|-------------|
| [TRG 10.01](https://eclipse-tractusx.github.io/docs/release/trg-10/trg-10-01) | KIT Architecture | KIT category classification and registration in master data |
| [TRG 10.02](https://eclipse-tractusx.github.io/docs/release/trg-10/trg-10-02) | KIT Content Structure | Required content sections and structure |
| [TRG 10.03](https://eclipse-tractusx.github.io/docs/release/trg-10/trg-10-03) | KIT Lifecycle | Maturity levels and artifact requirements |
| [TRG 10.04](https://eclipse-tractusx.github.io/docs/release/trg-10/trg-10-04) | KIT Graduation Process | Requirements and process for graduation |
| [TRG 10.05](https://eclipse-tractusx.github.io/docs/release/trg-10/trg-10-05) | KIT Deprecation Process | Deprecation criteria and procedures |
| [TRG 7.07](https://eclipse-tractusx.github.io/docs/release/trg-7/trg-7-07) | Legal Notice for Non-Code | Image and media licensing (CC-BY-4.0) |
| [TRG 7.08](https://eclipse-tractusx.github.io/docs/release/trg-7/trg-7-08) | Legal Notice for Documentation | Documentation licensing (CC-BY-4.0) |
| [TRG 1.03](https://eclipse-tractusx.github.io/docs/release/trg-1/trg-1-03) | CHANGELOG.md | Semantic versioning and changelog format |

## Additional Resources

### Documentation

- [KIT Framework Documentation](https://eclipse-tractusx.github.io/documentation/kit-framework) - Complete KIT structure and artifacts guide
- [KIT Getting Started Guide](https://eclipse-tractusx.github.io/documentation/kit-getting-started) - Step-by-step KIT creation guide
- [KIT Lifecycle Guide](https://eclipse-tractusx.github.io/documentation/kit-lifecycle) - Maturity levels and progression
- [KIT Master Data Overview](https://eclipse-tractusx.github.io/documentation/kit-master-data-overview) - Master data structure and registration

### Examples

Browse existing KITs for reference:

- [Connector KIT](https://eclipse-tractusx.github.io/docs-kits/kits/connector-kit/adoption-view) - Dataspace Foundation
- [Digital Twin KIT](https://eclipse-tractusx.github.io/docs-kits/kits/digital-twin-kit/adoption-view) - Industry Core Foundation
- [PCF Exchange KIT](https://eclipse-tractusx.github.io/docs-kits/kits/product-carbon-footprint-exchange-kit/adoption-view) - Cross-Industry Use Case
- [MaaS KIT](https://eclipse-tractusx.github.io/docs-kits/kits/manufacturing-as-a-service-kit/adoption-view) - Industry-Specific Use Case

### Tools

- [JSON Schema for KIT Master Data](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/utils/schemas/kitsData.schema.json) - Validation schema for master data
- [Artifact Requirements Data](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/blob/main/data/kitArtifactRequirementsData.js) - Detailed artifact requirements by maturity level

## Support and Community

### Get Help

- **KIT Community Office Hours**: Weekly alignment meetings - [Join Meeting](https://eclipse-tractusx.github.io/community/open-meetings#Eclipse%20Tractus-X%20KITs%20Community%20Office%20Hour)
- **Matrix Chat**: Daily discussions and support - [#tractusx-kits:matrix.eclipse.org](https://chat.eclipse.org/#/room/#tractusx-kits:matrix.eclipse.org)
- **GitHub Issues**: Report bugs or request features - [Create Issue](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/issues)

### Alignment Mechanisms

| Channel | Purpose | Frequency | Link |
|---------|---------|-----------|------|
| Alignment Day | Quarterly refinement sessions | Quarterly | [Release Process](https://eclipse-tractusx.github.io/docs/oss/release-process#alignment-day) |
| Open Planning Day | Open planning sessions | Quarterly | [Release Process](https://eclipse-tractusx.github.io/docs/oss/release-process#open-planning-day) |
| KIT Office Hours | Community alignment | Weekly | [Join Meeting](https://eclipse-tractusx.github.io/community/open-meetings) |
| Matrix Chat | Daily support | Ongoing | [Join Chat](https://chat.eclipse.org/#/room/#tractusx-kits:matrix.eclipse.org) |

### Contributing

Before creating a KIT, follow the contribution process:

1. **Discuss Idea**: Share in [GitHub Discussions](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io/discussions) (optional but recommended)
2. **Create Ticket**: Submit ticket in [sig-release](https://github.com/eclipse-tractusx/sig-release/issues)
3. **Present**: Present your KIT in Open Planning Day of target release
4. **Build**: Develop your KIT in your fork following this template
5. **Submit PR**: Create pull request to main repository with changelog and updated master data
6. **Review**: Get approval from responsible committer
7. **Publish**: KIT published in target release changelog

For detailed contribution guidelines, see [KIT Getting Started Guide](https://eclipse-tractusx.github.io/documentation/kit-getting-started#how-to-create-a-kit).

---

## Tips for Success

### Do's

- **Start Simple**: Begin with Sandbox maturity and iterate
- **Follow Examples**: Review existing KITs in your category
- **Engage Early**: Join KIT Office Hours before starting
- **Use Visuals**: Include diagrams, flowcharts, and screenshots
- **Provide Examples**: Include code samples, API examples, and sample data
- **Document Clearly**: Write for your target audience
- **Version Properly**: Follow semantic versioning strictly
- **Test Thoroughly**: Validate all links, code examples, and references

### Don'ts

- **Don't Copy-Paste**: Tailor content to your KIT's specific needs
- **Don't Skip Copyright**: Every file needs proper licensing
- **Don't Assume Knowledge**: Explain domain-specific terms
- **Don't Ignore TRGs**: All requirements are mandatory for compliance
- **Don't Work in Isolation**: Engage with community early and often
- **Don't Rush Graduation**: Ensure all requirements are met
- **Don't Leave TODOs**: Remove all placeholder text before submission
- **Don't Brand Content**: Keep images and content vendor-neutral

---

**Happy KIT Building!**

For questions, reach out via [Matrix Chat](https://chat.eclipse.org/#/room/#tractusx-kits:matrix.eclipse.org) or [KIT Office Hours](https://eclipse-tractusx.github.io/community/open-meetings).

## NOTICE

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2025 Contributors to the Eclipse Foundation
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)

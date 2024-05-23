 /**
 * Copyright (c) 2022,2023 Contributors to the Eclipse Foundation
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
 */

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-nocheck

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

const sidebars = {
    kits: [
        {
            type: 'category',
            label: 'Agents Kit',
            link: {
                type: 'generated-index',
            },
            collapsed: true,
            items: [
                'kits/knowledge-agents/Knowledge Agent Changelog',
                'kits/knowledge-agents/adoption-view/intro',
                {
                  type: 'category',
                  label: 'Development View',
                  link: {
                      type: 'doc',
                      id: 'kits/knowledge-agents/development-view/architecture',
                  },
                  collapsed: true,
                  items: [
                      'kits/knowledge-agents/development-view/architecture',
                      'kits/knowledge-agents/development-view/Arc42',
                      'kits/knowledge-agents/development-view/modules',
                      'kits/knowledge-agents/development-view/reference',
                      {
                          type: 'category',
                          label: 'API',
                          link: {
                              type: 'doc',
                              id: 'kits/knowledge-agents/development-view/api',
                          },
                          collapsed: true,
                          items: [
                              'kits/knowledge-agents/development-view/api/agent/getAgent',
                              'kits/knowledge-agents/development-view/api/agent/postAgent',
                              'kits/knowledge-agents/development-view/api/agent/skill/postSkill'
                          ],
                      }
                  ],
              },
              {
                  type: 'category',
                  label: 'Operation View',
                  link: {
                      type: 'doc',
                      id: 'kits/knowledge-agents/operation-view/deployment',
                  },
                  collapsed: true,
                  items: [
                      'kits/knowledge-agents/operation-view/deployment',
                      'kits/knowledge-agents/operation-view/agent_edc',
                      'kits/knowledge-agents/operation-view/provider',
                      'kits/knowledge-agents/operation-view/bridge',
                      'kits/knowledge-agents/operation-view/policy',
                      'kits/knowledge-agents/operation-view/testbed',
                    ],
              },
            ],
        },
        {
            type: 'category',
            label: 'Behaviour Twin KIT',
			link: {
				 type: 'doc',
				 id: 'kits/behaviour-twin-kit/overview',
			},
            collapsed: true,
            items: [
                'kits/behaviour-twin-kit/changelog',
                {
                    type: 'category',
                    label: 'Adoption View',
                    link: {
                         type: 'doc',
                         id: 'kits/behaviour-twin-kit/adoption-view/overview',
                    },
                    items: [
                        'kits/behaviour-twin-kit/adoption-view/introduction',
                        'kits/behaviour-twin-kit/adoption-view/architecture',
                        'kits/behaviour-twin-kit/adoption-view/knowledge-agent',
                        'kits/behaviour-twin-kit/adoption-view/versioning',
                        'kits/behaviour-twin-kit/adoption-view/to-be-considered',
                        'kits/behaviour-twin-kit/adoption-view/new-use-cases',
                        'kits/behaviour-twin-kit/adoption-view/terminology',
                    ]
                },
                {
                    type: 'category',
                    label: 'Development View',
                    link: {
                         type: 'doc',
                         id: 'kits/behaviour-twin-kit/development-view/overview',
                    },
                    items: [
                        'kits/behaviour-twin-kit/development-view/contracts-and-policies',
                        'kits/behaviour-twin-kit/development-view/data-bindings',
                        'kits/behaviour-twin-kit/development-view/service-bindings',
                        'kits/behaviour-twin-kit/development-view/skill',
                        'kits/behaviour-twin-kit/development-view/guidance-and-resources',
                    ]
                },
                {
                    type: 'category',
                    label: 'Use Cases',
                    link: {
                         type: 'doc',
                         id: 'kits/behaviour-twin-kit/use-cases/overview',
                    },
                    items: [
                        {
                            type: 'category',
                            label: 'Remaining useful Life',
                            link: {
                                 type: 'doc',
                                 id: 'kits/behaviour-twin-kit/use-cases/rul/overview',
                            },
                            items: [
                                {
                                    type: 'category',
                                    label: 'Adoption View',
                                    link: {
                                         type: 'doc',
                                         id: 'kits/behaviour-twin-kit/use-cases/rul/adoption-view/overview',
                                    },
                                    items: [
                                        'kits/behaviour-twin-kit/use-cases/rul/adoption-view/introduction',
                                        'kits/behaviour-twin-kit/use-cases/rul/adoption-view/architecture',
                                        'kits/behaviour-twin-kit/use-cases/rul/adoption-view/terminology',
                                    ]
                                },
                                {
                                    type: 'category',
                                    label: 'Development View',
                                    link: {
                                         type: 'doc',
                                         id: 'kits/behaviour-twin-kit/use-cases/rul/development-view/overview',
                                    },
                                    items: [
                                        'kits/behaviour-twin-kit/use-cases/rul/development-view/data-bindings',
                                        'kits/behaviour-twin-kit/use-cases/rul/development-view/service-bindings',
                                        'kits/behaviour-twin-kit/use-cases/rul/development-view/skill',
                                    ]
                                },
                            ]
                        },
                        {
                            type: 'category',
                            label: 'Health Indicator',
                            link: {
                                 type: 'doc',
                                 id: 'kits/behaviour-twin-kit/use-cases/hi/overview',
                            },
                            items: [
                                {
                                    type: 'category',
                                    label: 'Adoption View',
                                    link: {
                                         type: 'doc',
                                         id: 'kits/behaviour-twin-kit/use-cases/hi/adoption-view/overview',
                                    },
                                    items: [
                                        'kits/behaviour-twin-kit/use-cases/hi/adoption-view/introduction',
                                        'kits/behaviour-twin-kit/use-cases/hi/adoption-view/architecture',
                                        'kits/behaviour-twin-kit/use-cases/hi/adoption-view/terminology',
                                    ]
                                },
                                {
                                    type: 'category',
                                    label: 'Development View',
                                    link: {
                                         type: 'doc',
                                         id: 'kits/behaviour-twin-kit/use-cases/hi/development-view/overview',
                                    },
                                    items: [
                                        'kits/behaviour-twin-kit/use-cases/hi/development-view/data-bindings',
                                        'kits/behaviour-twin-kit/use-cases/hi/development-view/service-bindings',
                                        'kits/behaviour-twin-kit/use-cases/hi/development-view/skill',
                                    ]
                                },
                            ]
                        },
                    ]
                },
            ]
        },
        {
            type: 'category',
            label: 'Business Partner KIT',
            link: {
                type: 'generated-index',
            },
            collapsed: true,
            items: [
                'kits/Business Partner Kit/Changelog',
                'kits/Business Partner Kit/Adoption View',
                {
                    type: 'category',
                    label: 'Development View',
                    link: {
                        type: "generated-index",
                    },
                    items: [
                        'kits/Business Partner Kit/Software Development View/Specification',
                        {
                            type: "category",
                            label: "Gate API",
                            link: {
                                type: "generated-index",
                            },
                            items: require('./docs-kits/kits/Business Partner Kit/Software Development View/Gate Api/sidebar.js'),
                        },
                        {
                            type: "category",
                            label: "Pool API",
                            link: {
                                type: "generated-index",
                            },
                            items: require('./docs-kits/kits/Business Partner Kit/Software Development View/Pool Api/sidebar.js'),
                        },
                        {
                            type: "category",
                            label: "Bridge Dummy API",
                            link: {
                                type: "generated-index",
                            },
                            items: require('./docs-kits/kits/Business Partner Kit/Software Development View/Bridge Dummy Api/sidebar.js'),
                        },
                        {
                            type: "category",
                            label: "Cleaning Dummy API",
                            link: {
                                type: "generated-index",
                            },
                            items: require('./docs-kits/kits/Business Partner Kit/Software Development View/Cleaning Dummy Api/sidebar.js'),
                        },
                        {
                            type: "category",
                            label: "Orchestrator API",
                            link: {
                                type: "generated-index",
                            },
                            items: require('./docs-kits/kits/Business Partner Kit/Software Development View/Orchestrator Api/sidebar.js'),
                        },
                        'kits/Business Partner Kit/Software Development View/Use Cases'
                    ]
                },
                'kits/Business Partner Kit/Operation View',
                {
                    type: 'category',
                    label: 'Success Stories',
                    link: {
                        type: "generated-index",
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'kits/Business Partner Kit/Success Stories'
                        }
                    ]
                },
                {
                    type: 'category',
                    label: 'Architecture View',
                    link: {
                        type: "generated-index",
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'kits/Business Partner Kit/Documentation BPDM'
                        }
                    ]
                },
            ],
        },
        {
            type: 'category',
            label: 'Certificate Management KIT',
            link: {
                type: 'generated-index'
            },
            items: [
                'kits/Certificate Management Kit/Changelog',
                'kits/Certificate Management Kit/Adoption View',
                'kits/Certificate Management Kit/Operation View',
                {
                    type: 'category',
                    label: 'Development View',
                    link: {
                        type: "generated-index",
                    },
                    items: [
                        'kits/Certificate Management Kit/Software Development View/Specification',
                        {
                            type: 'link',
                            label: 'API',
                            href: 'https://app.swaggerhub.com/apis/eclipse-tractusx-bot/bpdm-certificate-management'
                        }
                    ]
                },
                {
                    type: 'category',
                    label: 'Documentation',
                    link: {
                        type: "generated-index",
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'kits/Certificate Management Kit/Documentation Certificate Management'
                        }
                    ]
                },
            ]
        },
        {
            type: 'category',
            label: 'Circularity KIT',
            link: {
                type: 'doc',
                id: 'kits/Circularity_KIT/page-adoption-view'
            },
            items: [
                'kits/Circularity_KIT/Changelog Circularity KIT',
                'kits/Circularity_KIT/page-adoption-view',
            ]
        },
        {
            type: 'category',
            label: 'Connector KIT',
            link: {
                type: 'generated-index',
            },
            collapsed: true,
            items: [
                'kits/Connector Kit/page_changelog',
                'kits/Connector Kit/Adoption View/connector_kit_adoption_view',
                {
                    type: 'category',
                    label: 'Development View',
                    link: {
                        type: 'doc',
                        id: 'kits/Connector Kit/Development View/connector_kit_development_view_specifications'
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'kits/Connector Kit/Development View',
                        },
                    ]
                },
                'kits/Connector Kit/Operation View/connector_kit_operation_view',

            ],
        },
        {
            type: 'category',
            label: 'Data Chain KIT',
            link: {
                type: 'generated-index',
            },
            collapsed: true,
            items: [
                'kits/Data Chain Kit/data chain kit changelog',
                'kits/Data Chain Kit/Adoption View Data Chain Kit',
                'kits/Data Chain Kit/Operation View',
                {
                    type: 'category',
                    label: 'Development View',
                    link: {
                        type: 'doc',
                        id: 'kits/Data Chain Kit/Software Development View/Specification'
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'kits/Data Chain Kit/Software Development View/Job Api'
                        }
                    ]
                },
                {
                    type: 'category',
                    label: 'Documentation',
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'kits/Data Chain Kit/Documentation'
                        }
                    ]
                },
            ],
        },
        {
            type: "category",
            label: "DCM KIT",
            link: {
              type: "generated-index"
            },
            collapsed: true,
            items: [
              {
                type: "autogenerated",
                dirName: "kits/DCM-Kit"
              }
            ]
        },
        {
            type: 'category',
            label: 'Data Governance Kit',
            link: {
                type: 'generated-index',
            },
            collapsed: true,
            items: [
                'kits/Data Governance Kit/Data Governance Kit Changelog',
                'kits/Data Governance Kit/Data Governance Kit Adoption View',
                {
                    type: 'category',
                    label: 'Development View',
                    link: {
                        type: 'doc',
                        id: 'kits/Data Governance Kit/Software Development View/Data Governance Kit Development View'
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'kits/Data Governance Kit/resources/MDX Files'
                        }
                    ]
                },
            ],
        },
        {
            type: 'category',
            label: 'Digital Twin KIT',
            link: {
                type: 'generated-index',
            },
            collapsed: true,
            items: [
                {
                    type: 'autogenerated',
                    dirName: 'kits/Digital Twin Kit',
                },
            ],
        },
        {
            type: 'category',
            label: 'Eco Pass KIT',
            link: {
                type: 'generated-index',
            },
            collapsed: true,
            items: [{
                type: 'autogenerated',
                dirName: 'kits/Eco_Pass_KIT',
            },
            ],
        },
        {
            type: 'category',
            label: 'ESS KIT',
            link: {
                type: 'generated-index',
            },
            collapsed: true,
            items: [{
                type: 'autogenerated',
                dirName: 'kits/ESS-Kit',
            },
            ],
        },
        {
            type: 'category',
            label: 'Industry Core KIT',
            link: {
                type: 'generated-index',
            },
            collapsed: true,
            items: [
                {
                    type: 'autogenerated',
                    dirName: 'kits/Industry Core Kit',
                },
            ],
        },
        {
            type: 'category',
            label: 'Model Based Development and Data Processing (MDP) KIT',
            link: {
                type: 'generated-index',
            },
            collapsed: true,
            items: [
                {
                    type: 'autogenerated',
                    dirName: 'kits/Behaviour Twin MDP Kit',
                },
            ],
        },
        {
            type: 'category',
            label: 'Modular Production Kit',
            link: {
              type: 'generated-index',
            },
            collapsed: true,
            items: [
              {
                type: 'autogenerated',
                dirName: 'kits/Modular Production Kit',
              },
            ],
        },
        {
            type: 'category',
            label: 'Manufacturing as a Service KIT',
            link: {
                type: 'generated-index',
            },
            collapsed: true,
            items: [
                {
                    type: 'autogenerated',
                    dirName: 'kits/Manufacturing as a Service Kit',
                },
            ],
        },
        {
            type: 'category',
            label: 'OSim Kit',
            link: {
                type: 'generated-index',
            },
            collapsed: true,
            items: [
                {
                    type: 'autogenerated',
                    dirName: 'kits/OSim Kit',
                },
            ],
        },
        {
            type: 'category',
            label: 'PCF Exchange KIT',
            link: {
                type: 'generated-index',
            },
            collapsed: true,
            items: [
                'kits/PCF Exchange Kit/PCF Exchange Kit Changelog',
                'kits/PCF Exchange Kit/Adoption View',
                'kits/PCF Exchange Kit/Operation View',
                {
                    type: 'category',
                    label: 'Development View',
                    link: {
                        type: "generated-index",
                    },
                    items: [
                        'kits/PCF Exchange Kit/Software Development View/Specification',
                        {
                            type: "category",
                            label: "PCF Exchange API",
                            link: {
                                type: "generated-index",
                            },
                            items: require('./docs-kits/kits/PCF Exchange Kit/Software Development View/pcf-exchange-api/sidebar.js'),
                        }
                    ]
                }

            ],
        },
        {
            type: 'category',
            label: 'Quality KIT',
            link: {
                type: 'generated-index',
            },
            collapsed: true,
            items: [
                {
                    type: 'autogenerated',
                    dirName: 'kits/Quality-Kit',
                },
            ],
        },
        {
            type: 'category',
            label: 'Traceability KIT',
            link: {
                type: 'generated-index',
            },
            collapsed: true,
            items: [
                {
                    type: 'autogenerated',
                    dirName: 'kits/Traceability Kit',
                },
            ],
        },
        {
            type: 'category',
            label: 'Upcoming KITs',
            link: {
                type: 'doc',
                id: 'kits/Resiliency/resiliency'
            },
            items: [
                'kits/Resiliency/maas',
                'kits/Resiliency/PURIS'
            ]
        },
    ]
};
module.exports = sidebars;

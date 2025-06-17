---
sidebar_position: 1
title: Bridging
---
<!--
 * Copyright (c) 2021 T-Systems International GmbH
 * Copyright (c) 2021 Bayerische Motoren Werke Aktiengesellschaft (BMW AG) 
 * Copyright (c) 2021 Mercedes-Benz AG
 * Copyright (c) 2021 ZF Friedrichshafen AG
 * Copyright (c) 2021 SAP SE
 * Copyright (c) 2021 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This documentation and the accompanying materials are made available under the
 * terms of the Creative Commons Attribution 4.0 International License,  which is available at
 * https://creativecommons.org/licenses/by/4.0/legalcode.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: CC-BY-4.0
-->

For Bridging between Knowledge Agents API and AAS, this KIT recommends deploying the [Tractus-X Knowledge Agents AAS Bridge (KA-AAS)](https://github.com/eclipse-tractusx/knowledge-agents-aas-api)

## Quick Setup Guide for AAS Bridge

### 1. Add Helm Dependency to the AAS Bridge

Add a helm dependency to your umbrella/infrastructure Chart.yaml (this example uses a Traveability graph, see [here](https://github.com/eclipse-tractusx/knowledge-agents-aas-bridge/blob/main/sparql-aas/README.md) for more options and full details).

```yaml
    - name: aas-bridge
      repository: https://eclipse-tractusx.github.io/charts/dev
      version: 1.13.7
      alias: my-aas-bridge
```

### 2. Configure the AAS Bridge with Mappings

Then configure the aas bridge in the values.yaml - especially you introduce so-called mapping domains ("traceability") which are pairs of XSLT stylesheets and SPARQL commands.
Using these mappings, the aas bridge know how to describe digital twins and submodels out of a background graph.

Each domain will have a mandatory mapping `aas` which describes the digital twins and the existance of submodels. And it will have a dynamic set of submodel mappings for the individual submodels.
Domains will also be representeded as a component of the resulting keys (asset and submodel id's).

In the following example, we map digital twins with one submodel (`PartAsPlanned`) out of an existing graph following to the [Bill-Of-Material Ontology](https://w3id.org/catenax/ontology/bill-of-material), the [Vehicle Ontology](https://w3id.org/catenax/ontology/vehicle), the [Common (Dataspace) Ontology](https://w3id.org/catenax/ontology/common) and the [Core (Meta) Ontology](https://w3id.org/catenax/ontology/core) - all being part of the [Complete (Merged) Ontology](https://w3id.org/catenax/ontology).

Since the AAS Bridge internally speaks https, you need to enable your ingress to relay the ssl-layer (see the `annotations` section).

```yaml
my-aas-bridge: 
  nameOverride: my-aas-bridge
  fullnameOverride: my-aas-bridge
  aas:
    persistence:
      # -- The default sparql server is embedded
      sparql: http://sparql.local
    endpoints:
      default:
        path: "/"
  ingresses:
  - enabled: true
    hostname: "aas-bridge.domain"
    annotations:
      nginx.ingress.kubernetes.io/backend-protocol: "HTTPS"
    endpoints:
      - default
    tls:
      enabled: true
domains:
  traceability:
    aas:
      mapping.xslt: |-
        <?xml version="1.0" encoding="UTF-8"?>
        <xsl:stylesheet version="1.0"
                        xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                        xmlns:sparql="http://www.w3.org/2005/sparql-results#"
                        xmlns:semanticid="https://w3id.org/catenax/ontology/aas#"
                        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <xsl:variable name="domain"  select="'traceability'"/>
            <xsl:variable name="semanticid"  select="'https://w3id.org/catenax/ontology/aas#'"/>
            <xsl:output method="xml" />
            <xsl:template name="genAssetId">
              <xsl:value-of select="$domain"/>/<xsl:value-of select="./sparql:binding[@name='id']/sparql:uri"/>
            </xsl:template>
            <xsl:template name="root" match="/">
                <aas:environment xmlns:aas="https://admin-shell.io/aas/3/0"
                                xsi:schemaLocation="">
                    <aas:assetAdministrationShells>
                        <xsl:for-each select="//sparql:result">
                        <aas:assetAdministrationShell>
                            <aas:idShort><xsl:call-template name="genAssetId"/></aas:idShort>
                            <aas:id><xsl:call-template name="genAssetId"/></aas:id>
                            <aas:assetInformation>
                                <aas:assetKind>Instance</aas:assetKind>
                                <aas:globalAssetId><xsl:call-template name="genAssetId"/></aas:globalAssetId>
                            </aas:assetInformation>
                            <aas:description>
                                <aas:langStringTextType>
                                    <aas:language>en</aas:language>
                                    <aas:text><xsl:value-of select="./sparql:binding[@name='name']/sparql:literal"/></aas:text>
                                </aas:langStringTextType>
                            </aas:description>
                            <aas:submodels>
                                <xsl:for-each select="./sparql:binding[@name != 'id' and @name != 'name']">
                                <aas:reference>
                                    <aas:type>ExternalReference</aas:type>
                                    <aas:keys>
                                        <aas:key>
                                            <aas:type>Submodel</aas:type>
                                            <aas:value><xsl:value-of select="$domain"/>/<xsl:value-of select="./sparql:uri"/>/<xsl:value-of select="../sparql:binding[@name = 'id']/sparql:uri"/></aas:value>
                                        </aas:key>
                                    </aas:keys>
                                </aas:reference>
                                </xsl:for-each>
                            </aas:submodels>
                        </aas:assetAdministrationShell>
                        </xsl:for-each>
                    </aas:assetAdministrationShells>
                </aas:environment>
            </xsl:template>
        </xsl:stylesheet>
      select-all.rq: |-
        PREFIX cx-common: <https://w3id.org/catenax/ontology/common#>
        PREFIX cx-core: <https://w3id.org/catenax/ontology/core#>
        PREFIX cx-vehicle: <https://w3id.org/catenax/ontology/vehicle#>
        PREFIX cx-bom: <https://w3id.org/catenax/ontology/bill-of-material#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

        #
        # A request for obtaining all asset administration shells for serialized parts
        #

        SELECT DISTINCT ?id ?name ?pasp ?psasp ?hasRecycling ?slbomap ?slusap ?mfr WHERE {

            # all parts are twins
            ?id rdf:type cx-vehicle:Part;
                cx-core:name ?name.

            # Part
            OPTIONAL{
                ?id cx-core:id ?manufacturerPartId.
                BIND(<urn:bamm:io.catenax.part_as_planned:1.0.1#PartAsPlanned> as ?pasp).
            }
        }
        ORDER BY DESC(?id)
      select-some.rq: |-
        PREFIX cx-common: <https://w3id.org/catenax/ontology/common#>
        PREFIX cx-core: <https://w3id.org/catenax/ontology/core#>
        PREFIX cx-vehicle: <https://w3id.org/catenax/ontology/vehicle#>
        PREFIX cx-bom: <https://w3id.org/catenax/ontology/bill-of-material#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

        #
        # A request for obtaining specific asset administration shells for serialized parts
        #

        SELECT DISTINCT ?id ?name ?pasp ?psasp ?hasRecycling ?slbomap ?slusap ?mfr WHERE {

            VALUES(?id) {
                (%s)
            }

            # all parts are twins
            ?id rdf:type cx-vehicle:Part;
                cx-core:name ?name.

            # Part
            OPTIONAL{
                ?id cx-core:id ?manufacturerPartId.
                BIND(<urn:bamm:io.catenax.part_as_planned:1.0.1#PartAsPlanned> as ?pasp).
            }
        }
        ORDER BY DESC(?id)
    partAsPlanned:
      mapping.xslt: |-
        <?xml version="1.0" encoding="UTF-8"?>
        <xsl:stylesheet version="1.0"
                        xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                        xmlns:sparql="http://www.w3.org/2005/sparql-results#"
                        xmlns:semanticid="urn:bamm:io.catenax.part_as_planned:1.0.1#PartAsPlanned"
                        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                        xmlns:xs="http://www.w3.org/2001/XMLSchema">
            <xsl:variable name="domain" select="'traceability'"/>
            <xsl:variable name="semanticid"  select="'urn:bamm:io.catenax.part_as_planned:1.0.1#PartAsPlanned'"/>
            <xsl:output method="xml" />
            <xsl:template name="genAssetId">
                <xsl:value-of select="$domain"/>/<xsl:value-of select="./sparql:binding[@name='catenaXId']/sparql:uri"/>
            </xsl:template>
            <xsl:template name="genSubmodelId">
                <xsl:value-of select="$domain"/>/<xsl:value-of select="$semanticid"/>/<xsl:value-of select="./sparql:binding[@name='catenaXId']/sparql:uri"/>
            </xsl:template>
            <xsl:key name="catenax-id" match="//sparql:result" use="sparql:binding[@name='catenaXId']/sparql:uri" />
            <xsl:template name="root" match="/">
                <aas:environment xmlns:aas="https://admin-shell.io/aas/3/0"
                                xsi:schemaLocation="">
                    <aas:assetAdministrationShells>
                        <xsl:for-each select="//sparql:result[count(. | key('catenax-id', ./sparql:binding[@name='catenaXId']/sparql:uri)[1]) = 1]">
                            <aas:assetAdministrationShell>
                                <aas:idShort><xsl:call-template name="genAssetId"/></aas:idShort>
                                <aas:id><xsl:call-template name="genAssetId"/></aas:id>
                                <aas:assetInformation>
                                    <aas:assetKind>Instance</aas:assetKind>
                                    <aas:globalAssetId><xsl:call-template name="genAssetId"/></aas:globalAssetId>
                                </aas:assetInformation>
                                <aas:submodels>
                                    <xsl:for-each select="key('catenax-id',./sparql:binding[@name='catenaXId']/sparql:uri)">
                                    <aas:reference>
                                        <aas:type>ExternalReference</aas:type>
                                        <aas:keys>
                                            <aas:key>
                                                <aas:type>Submodel</aas:type>
                                                <aas:value><xsl:call-template name="genSubmodelId"/></aas:value>
                                            </aas:key>
                                        </aas:keys>
                                    </aas:reference>
                                    </xsl:for-each>
                                </aas:submodels>
                            </aas:assetAdministrationShell>
                        </xsl:for-each>
                    </aas:assetAdministrationShells>
                    <aas:submodels>
                        <xsl:for-each select="//sparql:result">
                            <aas:submodel>
                                <aas:kind>Instance</aas:kind>
                                <aas:semanticId>
                                    <aas:type>ModelReference</aas:type>
                                    <aas:keys>
                                        <aas:key>
                                            <aas:type>ConceptDescription</aas:type>
                                            <aas:value><xsl:value-of select="$semanticid"/></aas:value>
                                        </aas:key>
                                    </aas:keys>
                                </aas:semanticId>
                                <aas:id><xsl:call-template name="genSubmodelId"/></aas:id>
                                <aas:idShort>PartAsPlanned</aas:idShort>
                                <aas:description>
                                    <aas:langStringTextType>
                                        <aas:language>en</aas:language>
                                        <aas:text>A Part AsPlanned represents an item in the Catena-X Bill of Material (BOM) in As-Planned lifecycle status. </aas:text>
                                    </aas:langStringTextType>
                                </aas:description>
                                <aas:submodelElements>
                                    <aas:property>
                                        <aas:category>Key</aas:category>
                                        <aas:idShort>catenaXId</aas:idShort>
                                        <aas:description>
                                            <aas:langStringTextType>
                                                <aas:language>en</aas:language>
                                                <aas:text>The fully anonymous Catena-X ID of the serialized part, valid for the Catena-X dataspace.</aas:text>
                                            </aas:langStringTextType>
                                        </aas:description>
                                        <aas:displayName>
                                            <aas:langStringNameType>
                                                <aas:language>en</aas:language>
                                                <aas:text>Catena-X Identifier</aas:text>
                                            </aas:langStringNameType>
                                        </aas:displayName>
                                        <aas:semanticId>
                                            <aas:type>ModelReference</aas:type>
                                            <aas:keys>
                                                <aas:key>
                                                    <aas:type>ConceptDescription</aas:type>
                                                    <aas:value>urn:bamm:io.catenax.part_as_planned:1.0.1#catenaXId</aas:value>
                                                </aas:key>
                                            </aas:keys>
                                        </aas:semanticId>
                                        <aas:valueType>xs:string</aas:valueType>
                                        <aas:value><xsl:value-of select="./sparql:binding[@name='catenaXId']/sparql:uri"/></aas:value>
                                    </aas:property>
                                    <aas:submodelElementCollection>
                                        <aas:idShort>partTypeInformation</aas:idShort>
                                        <aas:description>
                                            <aas:langStringTextType>
                                                <aas:language>en</aas:language>
                                                <aas:text>Encapsulation for data related to the part type</aas:text>
                                            </aas:langStringTextType>
                                        </aas:description>
                                        <aas:displayName>
                                            <aas:langStringNameType>
                                                <aas:language>en</aas:language>
                                                <aas:text>Part Type Information Entity</aas:text>
                                            </aas:langStringNameType>
                                        </aas:displayName>
                                        <aas:value>
                                            <aas:property>
                                                <aas:category>Key</aas:category>
                                                <aas:idShort>manufacturerPartId</aas:idShort>
                                                <aas:description>
                                                    <aas:langStringTextType>
                                                        <aas:language>en</aas:language>
                                                        <aas:text>Part ID as assigned by the manufacturer of the part. The Part ID identifies the part (as designed) in the manufacturer`s dataspace. The Part ID does not reference a specific instance of a part and thus should not be confused with the serial number.</aas:text>
                                                    </aas:langStringTextType>
                                                </aas:description>
                                                <aas:displayName>
                                                    <aas:langStringNameType>
                                                        <aas:language>en</aas:language>
                                                        <aas:text>Manufacturer Part ID</aas:text>
                                                    </aas:langStringNameType>
                                                </aas:displayName>
                                                <aas:semanticId>
                                                    <aas:type>ModelReference</aas:type>
                                                    <aas:keys>
                                                        <aas:key>
                                                            <aas:type>ConceptDescription</aas:type>
                                                            <aas:value>urn:bamm:io.catenax.part_as_planned:1.0.1#manufacturerPartId</aas:value>
                                                        </aas:key>
                                                    </aas:keys>
                                                </aas:semanticId>
                                                <aas:valueType>xs:string</aas:valueType>
                                                <aas:value><xsl:value-of select="./sparql:binding[@name='manufacturerPartId']/sparql:literal"/></aas:value>
                                            </aas:property>
                                            <aas:property>
                                                <aas:category>Value</aas:category>
                                                <aas:idShort>nameAtManufacturer</aas:idShort>
                                                <aas:description>
                                                    <aas:langStringTextType>
                                                        <aas:language>en</aas:language>
                                                        <aas:text>Name of the part as assigned by the manufacturer.</aas:text>
                                                    </aas:langStringTextType>
                                                </aas:description>
                                                <aas:displayName>
                                                    <aas:langStringNameType>
                                                        <aas:language>en</aas:language>
                                                        <aas:text>Name at Manufacturer</aas:text>
                                                    </aas:langStringNameType>
                                                </aas:displayName>
                                                <aas:semanticId>
                                                    <aas:type>ModelReference</aas:type>
                                                    <aas:keys>
                                                        <aas:key>
                                                            <aas:type>ConceptDescription</aas:type>
                                                            <aas:value>urn:bamm:io.catenax.part_as_planned:1.0.1#nameAtManufacturer</aas:value>
                                                        </aas:key>
                                                    </aas:keys>
                                                </aas:semanticId>
                                                <aas:valueType>xs:string</aas:valueType>
                                                <aas:value><xsl:value-of select="./sparql:binding[@name='nameAtManufacturer']/sparql:literal"/></aas:value>
                                            </aas:property>
                                            <aas:property>
                                                <aas:category>Enum</aas:category>
                                                <aas:idShort>classification</aas:idShort>
                                                <aas:description>
                                                    <aas:langStringTextType>
                                                        <aas:language>en</aas:language>
                                                        <aas:text>Classification of the part as assigned by the manufacturer.</aas:text>
                                                    </aas:langStringTextType>
                                                </aas:description>
                                                <aas:displayName>
                                                    <aas:langStringNameType>
                                                        <aas:language>en</aas:language>
                                                        <aas:text>Product Classification</aas:text>
                                                    </aas:langStringNameType>
                                                </aas:displayName>
                                                <aas:semanticId>
                                                    <aas:type>ModelReference</aas:type>
                                                    <aas:keys>
                                                        <aas:key>
                                                            <aas:type>ConceptDescription</aas:type>
                                                            <aas:value>urn:bamm:io.catenax.part_as_planned:1.0.1#classification</aas:value>
                                                        </aas:key>
                                                    </aas:keys>
                                                </aas:semanticId>
                                                <aas:valueType>xs:string</aas:valueType>
                                                <aas:value><xsl:value-of select="./sparql:binding[@name='classification']/sparql:literal"/></aas:value>
                                            </aas:property>
                                        </aas:value>
                                    </aas:submodelElementCollection>
                                    <aas:submodelElementCollection>
                                        <aas:idShort>validityPeriod</aas:idShort>
                                        <aas:description>
                                            <aas:langStringTextType>
                                                <aas:language>en</aas:language>
                                                <aas:text>Temporal validity period of the part.</aas:text>
                                            </aas:langStringTextType>
                                        </aas:description>
                                        <aas:displayName>
                                            <aas:langStringNameType>
                                                <aas:language>en</aas:language>
                                                <aas:text>validityPeriod</aas:text>
                                            </aas:langStringNameType>
                                        </aas:displayName>
                                        <aas:value>
                                            <aas:property>
                                                <aas:category>Time</aas:category>
                                                <aas:idShort>validFrom</aas:idShort>
                                                <aas:description>
                                                    <aas:langStringTextType>
                                                        <aas:language>en</aas:language>
                                                        <aas:text>Start date of validity period.</aas:text>
                                                    </aas:langStringTextType>
                                                </aas:description>
                                                <aas:displayName>
                                                    <aas:langStringNameType>
                                                        <aas:language>en</aas:language>
                                                        <aas:text>Valid From</aas:text>
                                                    </aas:langStringNameType>
                                                </aas:displayName>
                                                <aas:semanticId>
                                                    <aas:type>ModelReference</aas:type>
                                                    <aas:keys>
                                                        <aas:key>
                                                            <aas:type>ConceptDescription</aas:type>
                                                            <aas:value>urn:bamm:io.catenax.part_as_planned:1.0.1#validFrom</aas:value>
                                                        </aas:key>
                                                    </aas:keys>
                                                </aas:semanticId>
                                                <aas:valueType>xs:dateTime</aas:valueType>
                                                <aas:value><xsl:value-of select="./sparql:binding[@name='validFrom']/sparql:literal"/></aas:value>
                                            </aas:property>
                                            <aas:property>
                                                <aas:category>Time</aas:category>
                                                <aas:idShort>validFrom</aas:idShort>
                                                <aas:description>
                                                    <aas:langStringTextType>
                                                        <aas:language>en</aas:language>
                                                        <aas:text>End date of validity period.</aas:text>
                                                    </aas:langStringTextType>
                                                </aas:description>
                                                <aas:displayName>
                                                    <aas:langStringNameType>
                                                        <aas:language>en</aas:language>
                                                        <aas:text>Valid To</aas:text>
                                                    </aas:langStringNameType>
                                                </aas:displayName>
                                                <aas:semanticId>
                                                    <aas:type>ModelReference</aas:type>
                                                    <aas:keys>
                                                        <aas:key>
                                                            <aas:type>ConceptDescription</aas:type>
                                                            <aas:value>urn:bamm:io.catenax.part_as_planned:1.0.1#validTo</aas:value>
                                                        </aas:key>
                                                    </aas:keys>
                                                </aas:semanticId>
                                                <aas:valueType>xs:dateTime</aas:valueType>
                                                <aas:value><xsl:value-of select="./sparql:binding[@name='validTo']/sparql:literal"/></aas:value>
                                            </aas:property>
                                        </aas:value>
                                    </aas:submodelElementCollection>
                                </aas:submodelElements>
                            </aas:submodel>
                        </xsl:for-each>
                    </aas:submodels>
                    <aas:conceptDescriptions>
                    </aas:conceptDescriptions>
                </aas:environment>
            </xsl:template>
        </xsl:stylesheet>
      select-all.rq: |-
        PREFIX cx-common: <https://w3id.org/catenax/ontology/common#>
        PREFIX cx-core: <https://w3id.org/catenax/ontology/core#>
        PREFIX cx-vehicle: <https://w3id.org/catenax/ontology/vehicle#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

        # Select all part information

        SELECT ?catenaXId ?validFrom ?validTo ?classification ?manufacturerPartId ?nameAtManufacturer
        WHERE {
            ?catenaXId rdf:type cx-vehicle:Part;
                cx-core:id ?manufacturerPartId;
                cx-core:name ?nameAtManufacturer;
                cx-vehicle:productionPeriodStart ?validFrom;
                cx-vehicle:productionPeriodEnd ?validTo.
            BIND('product' AS ?classification).
        }
        ORDER BY DESC(?catenaXId)
      select-some.rq: |-
        PREFIX cx-common: <https://w3id.org/catenax/ontology/common#>
        PREFIX cx-core: <https://w3id.org/catenax/ontology/core#>
        PREFIX cx-vehicle: <https://w3id.org/catenax/ontology/vehicle#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

        # Select some part information

        SELECT ?catenaXId ?validFrom ?validTo ?classification ?manufacturerPartId ?nameAtManufacturer
        WHERE {

            VALUES(?catenaXId) {
                (%s)
            }

            ?catenaXId rdf:type cx-vehicle:Part;
                cx-core:id ?manufacturerPartId;
                cx-core:name ?nameAtManufacturer;
                cx-vehicle:productionPeriodStart ?validFrom;
                cx-vehicle:productionPeriodEnd ?validTo.

            BIND('product' AS ?classification).
        }
        ORDER BY DESC(?catenaXId)
```

### 3. Testdrive the AAS Bridge

After the aas bridge has been setup, you may invoke AAS Api calls against it

```console
curl --location 'https://aas-bridge.domain/api/v3.0/description'
```

and you should receive an answer, such as

```json
{
    "profiles": [
        "https://admin-shell.io/aas/API/3/0/AssetAdministrationShellRepositoryServiceSpecification/SSP-001",
        "https://admin-shell.io/aas/API/3/0/SubmodelRepositoryServiceSpecification/SSP-001",
        "https://admin-shell.io/aas/API/3/0/ConceptDescriptionServiceSpecification/SSP-001",
        "https://admin-shell.io/aas/API/3/0/DiscoveryServiceSpecification/SSP-001"
    ]
}
```

To get the list of shells, you may invoke

```console
curl --location 'http://aas-bridge.domain/api/v3.0/shells'
```

and you should receive an answer, such as

```json
{
    "result": [
        {
            "modelType": "AssetAdministrationShell",
            "assetInformation": {
                "assetKind": "Instance",
                "globalAssetId": "traceability/urn:uuid:f5efbf45-7d84-4442-b3b8-05cf1c5c5a0b"
            },
            "submodels": [
                {
                    "keys": [
                        {
                            "type": "Submodel",
                            "value": "traceability/urn:bamm:io.catenax.part_as_planned:1.0.1#PartAsPlanned/urn:uuid:f5efbf45-7d84-4442-b3b8-05cf1c5c5a0b"
                        }
                    ],
                    "type": "ExternalReference"
                }
            ],
            "id": "traceability/urn:uuid:f5efbf45-7d84-4442-b3b8-05cf1c5c5a0b",
            "description": [
                {
                    "language": "en",
                    "text": "Tier C Piston Rod"
                }
            ],
            "idShort": "traceability/urn:uuid:f5efbf45-7d84-4442-b3b8-05cf1c5c5a0b"
        },
        ...
        {
            "modelType": "AssetAdministrationShell",
            "assetInformation": {
                "assetKind": "Instance",
                "globalAssetId": "traceability/urn:uuid:0733946c-59c6-41ae-9570-cb43a6e4c79e"
            },
            "submodels": [
                {
                    "keys": [
                        {
                            "type": "Submodel",
                            "value": "traceability/urn:bamm:io.catenax.part_as_planned:1.0.1#PartAsPlanned/urn:uuid:0733946c-59c6-41ae-9570-cb43a6e4c79e"
                        }
                    ],
                    "type": "ExternalReference"
                }
            ],
            "id": "traceability/urn:uuid:0733946c-59c6-41ae-9570-cb43a6e4c79e",
            "description": [
                {
                    "language": "en",
                    "text": "Vehicle Model A"
                }
            ],
            "idShort": "traceability/urn:uuid:0733946c-59c6-41ae-9570-cb43a6e4c79e"
        }
    ],
    "paging_metadata": {
        "cursor": null
    }
}
```

To get the list of shells, you may invoke

```console
curl --location 'http://oem-aas-bridge.knowledge.int.catena-x.net/api/v3.0/submodels?content=value&level=deep'
```

and you should receive an answer, such as

```json
{
    "result": [
        {
            "modelType": "Submodel",
            "kind": "Instance",
            "semanticId": {
                "keys": [
                    {
                        "type": "ConceptDescription",
                        "value": "urn:bamm:io.catenax.part_as_planned:1.0.1#PartAsPlanned"
                    }
                ],
                "type": "ModelReference"
            },
            "id": "traceability/urn:bamm:io.catenax.part_as_planned:1.0.1#PartAsPlanned/urn:uuid:f5efbf45-7d84-4442-b3b8-05cf1c5c5a0b",
            "description": [
                {
                    "language": "en",
                    "text": "A Part AsPlanned represents an item in the Catena-X Bill of Material (BOM) in As-Planned lifecycle status. "
                }
            ],
            "idShort": "PartAsPlanned",
            "submodelElements": [
                {
                    "modelType": "Property",
                    "semanticId": {
                        "keys": [
                            {
                                "type": "ConceptDescription",
                                "value": "urn:bamm:io.catenax.part_as_planned:1.0.1#catenaXId"
                            }
                        ],
                        "type": "ModelReference"
                    },
                    "value": "urn:uuid:f5efbf45-7d84-4442-b3b8-05cf1c5c5a0b",
                    "valueType": "xs:string",
                    "category": "Key",
                    "description": [
                        {
                            "language": "en",
                            "text": "The fully anonymous Catena-X ID of the serialized part, valid for the Catena-X dataspace."
                        }
                    ],
                    "displayName": [
                        {
                            "language": "en",
                            "text": "Catena-X Identifier"
                        }
                    ],
                    "idShort": "catenaXId"
                },
                {
                    "modelType": "SubmodelElementCollection",
                    "description": [
                        {
                            "language": "en",
                            "text": "Encapsulation for data related to the part type"
                        }
                    ],
                    "displayName": [
                        {
                            "language": "en",
                            "text": "Part Type Information Entity"
                        }
                    ],
                    "idShort": "partTypeInformation",
                    "value": [
                        {
                            "modelType": "Property",
                            "semanticId": {
                                "keys": [
                                    {
                                        "type": "ConceptDescription",
                                        "value": "urn:bamm:io.catenax.part_as_planned:1.0.1#manufacturerPartId"
                                    }
                                ],
                                "type": "ModelReference"
                            },
                            "value": "5760234-23",
                            "valueType": "xs:string",
                            "category": "Key",
                            "description": [
                                {
                                    "language": "en",
                                    "text": "Part ID as assigned by the manufacturer of the part. The Part ID identifies the part (as designed) in the manufacturer`s dataspace. The Part ID does not reference a specific instance of a part and thus should not be confused with the serial number."
                                }
                            ],
                            "displayName": [
                                {
                                    "language": "en",
                                    "text": "Manufacturer Part ID"
                                }
                            ],
                            "idShort": "manufacturerPartId"
                        },
                        {
                            "modelType": "Property",
                            "semanticId": {
                                "keys": [
                                    {
                                        "type": "ConceptDescription",
                                        "value": "urn:bamm:io.catenax.part_as_planned:1.0.1#nameAtManufacturer"
                                    }
                                ],
                                "type": "ModelReference"
                            },
                            "value": "Tier C Piston Rod",
                            "valueType": "xs:string",
                            "category": "Value",
                            "description": [
                                {
                                    "language": "en",
                                    "text": "Name of the part as assigned by the manufacturer."
                                }
                            ],
                            "displayName": [
                                {
                                    "language": "en",
                                    "text": "Name at Manufacturer"
                                }
                            ],
                            "idShort": "nameAtManufacturer"
                        },
                        {
                            "modelType": "Property",
                            "semanticId": {
                                "keys": [
                                    {
                                        "type": "ConceptDescription",
                                        "value": "urn:bamm:io.catenax.part_as_planned:1.0.1#classification"
                                    }
                                ],
                                "type": "ModelReference"
                            },
                            "value": "product",
                            "valueType": "xs:string",
                            "category": "Enum",
                            "description": [
                                {
                                    "language": "en",
                                    "text": "Classification of the part as assigned by the manufacturer."
                                }
                            ],
                            "displayName": [
                                {
                                    "language": "en",
                                    "text": "Product Classification"
                                }
                            ],
                            "idShort": "classification"
                        }
                    ]
                },
                {
                    "modelType": "SubmodelElementCollection",
                    "description": [
                        {
                            "language": "en",
                            "text": "Temporal validity period of the part."
                        }
                    ],
                    "displayName": [
                        {
                            "language": "en",
                            "text": "validityPeriod"
                        }
                    ],
                    "idShort": "validityPeriod",
                    "value": [
                        {
                            "modelType": "Property",
                            "semanticId": {
                                "keys": [
                                    {
                                        "type": "ConceptDescription",
                                        "value": "urn:bamm:io.catenax.part_as_planned:1.0.1#validFrom"
                                    }
                                ],
                                "type": "ModelReference"
                            },
                            "value": "2014-02-24",
                            "valueType": "xs:dateTime",
                            "category": "Time",
                            "description": [
                                {
                                    "language": "en",
                                    "text": "Start date of validity period."
                                }
                            ],
                            "displayName": [
                                {
                                    "language": "en",
                                    "text": "Valid From"
                                }
                            ],
                            "idShort": "validFrom"
                        },
                        {
                            "modelType": "Property",
                            "semanticId": {
                                "keys": [
                                    {
                                        "type": "ConceptDescription",
                                        "value": "urn:bamm:io.catenax.part_as_planned:1.0.1#validTo"
                                    }
                                ],
                                "type": "ModelReference"
                            },
                            "value": "2027-11-04",
                            "valueType": "xs:dateTime",
                            "category": "Time",
                            "description": [
                                {
                                    "language": "en",
                                    "text": "End date of validity period."
                                }
                            ],
                            "displayName": [
                                {
                                    "language": "en",
                                    "text": "Valid To"
                                }
                            ],
                            "idShort": "validFrom"
                        }
                    ]
                }
            ]
        },
        ---
                {
            "modelType": "Submodel",
            "kind": "Instance",
            "semanticId": {
                "keys": [
                    {
                        "type": "ConceptDescription",
                        "value": "urn:bamm:io.catenax.part_as_planned:1.0.1#PartAsPlanned"
                    }
                ],
                "type": "ModelReference"
            },
            "id": "traceability/urn:bamm:io.catenax.part_as_planned:1.0.1#PartAsPlanned/urn:uuid:0733946c-59c6-41ae-9570-cb43a6e4c79e",
            "description": [
                {
                    "language": "en",
                    "text": "A Part AsPlanned represents an item in the Catena-X Bill of Material (BOM) in As-Planned lifecycle status. "
                }
            ],
            "idShort": "PartAsPlanned",
            "submodelElements": [
                {
                    "modelType": "Property",
                    "semanticId": {
                        "keys": [
                            {
                                "type": "ConceptDescription",
                                "value": "urn:bamm:io.catenax.part_as_planned:1.0.1#catenaXId"
                            }
                        ],
                        "type": "ModelReference"
                    },
                    "value": "urn:uuid:0733946c-59c6-41ae-9570-cb43a6e4c79e",
                    "valueType": "xs:string",
                    "category": "Key",
                    "description": [
                        {
                            "language": "en",
                            "text": "The fully anonymous Catena-X ID of the serialized part, valid for the Catena-X dataspace."
                        }
                    ],
                    "displayName": [
                        {
                            "language": "en",
                            "text": "Catena-X Identifier"
                        }
                    ],
                    "idShort": "catenaXId"
                },
                {
                    "modelType": "SubmodelElementCollection",
                    "description": [
                        {
                            "language": "en",
                            "text": "Encapsulation for data related to the part type"
                        }
                    ],
                    "displayName": [
                        {
                            "language": "en",
                            "text": "Part Type Information Entity"
                        }
                    ],
                    "idShort": "partTypeInformation",
                    "value": [
                        {
                            "modelType": "Property",
                            "semanticId": {
                                "keys": [
                                    {
                                        "type": "ConceptDescription",
                                        "value": "urn:bamm:io.catenax.part_as_planned:1.0.1#manufacturerPartId"
                                    }
                                ],
                                "type": "ModelReference"
                            },
                            "value": "ZX-55",
                            "valueType": "xs:string",
                            "category": "Key",
                            "description": [
                                {
                                    "language": "en",
                                    "text": "Part ID as assigned by the manufacturer of the part. The Part ID identifies the part (as designed) in the manufacturer`s dataspace. The Part ID does not reference a specific instance of a part and thus should not be confused with the serial number."
                                }
                            ],
                            "displayName": [
                                {
                                    "language": "en",
                                    "text": "Manufacturer Part ID"
                                }
                            ],
                            "idShort": "manufacturerPartId"
                        },
                        {
                            "modelType": "Property",
                            "semanticId": {
                                "keys": [
                                    {
                                        "type": "ConceptDescription",
                                        "value": "urn:bamm:io.catenax.part_as_planned:1.0.1#nameAtManufacturer"
                                    }
                                ],
                                "type": "ModelReference"
                            },
                            "value": "Vehicle Model A",
                            "valueType": "xs:string",
                            "category": "Value",
                            "description": [
                                {
                                    "language": "en",
                                    "text": "Name of the part as assigned by the manufacturer."
                                }
                            ],
                            "displayName": [
                                {
                                    "language": "en",
                                    "text": "Name at Manufacturer"
                                }
                            ],
                            "idShort": "nameAtManufacturer"
                        },
                        {
                            "modelType": "Property",
                            "semanticId": {
                                "keys": [
                                    {
                                        "type": "ConceptDescription",
                                        "value": "urn:bamm:io.catenax.part_as_planned:1.0.1#classification"
                                    }
                                ],
                                "type": "ModelReference"
                            },
                            "value": "product",
                            "valueType": "xs:string",
                            "category": "Enum",
                            "description": [
                                {
                                    "language": "en",
                                    "text": "Classification of the part as assigned by the manufacturer."
                                }
                            ],
                            "displayName": [
                                {
                                    "language": "en",
                                    "text": "Product Classification"
                                }
                            ],
                            "idShort": "classification"
                        }
                    ]
                },
                {
                    "modelType": "SubmodelElementCollection",
                    "description": [
                        {
                            "language": "en",
                            "text": "Temporal validity period of the part."
                        }
                    ],
                    "displayName": [
                        {
                            "language": "en",
                            "text": "validityPeriod"
                        }
                    ],
                    "idShort": "validityPeriod",
                    "value": [
                        {
                            "modelType": "Property",
                            "semanticId": {
                                "keys": [
                                    {
                                        "type": "ConceptDescription",
                                        "value": "urn:bamm:io.catenax.part_as_planned:1.0.1#validFrom"
                                    }
                                ],
                                "type": "ModelReference"
                            },
                            "value": "2017-01-03",
                            "valueType": "xs:dateTime",
                            "category": "Time",
                            "description": [
                                {
                                    "language": "en",
                                    "text": "Start date of validity period."
                                }
                            ],
                            "displayName": [
                                {
                                    "language": "en",
                                    "text": "Valid From"
                                }
                            ],
                            "idShort": "validFrom"
                        },
                        {
                            "modelType": "Property",
                            "semanticId": {
                                "keys": [
                                    {
                                        "type": "ConceptDescription",
                                        "value": "urn:bamm:io.catenax.part_as_planned:1.0.1#validTo"
                                    }
                                ],
                                "type": "ModelReference"
                            },
                            "value": "2029-11-15",
                            "valueType": "xs:dateTime",
                            "category": "Time",
                            "description": [
                                {
                                    "language": "en",
                                    "text": "End date of validity period."
                                }
                            ],
                            "displayName": [
                                {
                                    "language": "en",
                                    "text": "Valid To"
                                }
                            ],
                            "idShort": "validFrom"
                        }
                    ]
                }
            ]
        }
    ],
    "paging_metadata": {
        "cursor": null
    }
}
```

To access a particular shell, you may

```console
curl --location 'http://oem-aas-bridge.knowledge.int.catena-x.net/api/v3.0/shells/dHJhY2VhYmlsaXR5L3Vybjp1dWlkOmY1ZWZiZjQ1LTdkODQtNDQ0Mi1iM2I4LTA1Y2YxYzVjNWEwYg=='
```

which would return

```json
{
    "modelType": "AssetAdministrationShell",
    "assetInformation": {
        "assetKind": "Instance",
        "globalAssetId": "traceability/urn:uuid:f5efbf45-7d84-4442-b3b8-05cf1c5c5a0b"
    },
    "submodels": [
        {
            "keys": [
                {
                    "type": "Submodel",
                    "value": "traceability/urn:bamm:io.catenax.part_as_planned:1.0.1#PartAsPlanned/urn:uuid:f5efbf45-7d84-4442-b3b8-05cf1c5c5a0b"
                }
            ],
            "type": "ExternalReference"
        }
    ],
    "id": "traceability/urn:uuid:f5efbf45-7d84-4442-b3b8-05cf1c5c5a0b",
    "description": [
        {
            "language": "en",
            "text": "Tier C Piston Rod"
        }
    ],
    "idShort": "traceability/urn:uuid:f5efbf45-7d84-4442-b3b8-05cf1c5c5a0b"
}
```

A particular submodel can be selected as follows

```console
curl --location 'http://oem-aas-bridge.knowledge.int.catena-x.net/api/v3.0/shells/dHJhY2VhYmlsaXR5L3Vybjp1dWlkOmY1ZWZiZjQ1LTdkODQtNDQ0Mi1iM2I4LTA1Y2YxYzVjNWEwYg=='
```

which would produce a result like

```json
{
    "modelType": "AssetAdministrationShell",
    "assetInformation": {
        "assetKind": "Instance",
        "globalAssetId": "traceability/urn:uuid:f5efbf45-7d84-4442-b3b8-05cf1c5c5a0b"
    },
    "submodels": [
        {
            "keys": [
                {
                    "type": "Submodel",
                    "value": "traceability/urn:bamm:io.catenax.part_as_planned:1.0.1#PartAsPlanned/urn:uuid:f5efbf45-7d84-4442-b3b8-05cf1c5c5a0b"
                }
            ],
            "type": "ExternalReference"
        }
    ],
    "id": "traceability/urn:uuid:f5efbf45-7d84-4442-b3b8-05cf1c5c5a0b",
    "description": [
        {
            "language": "en",
            "text": "Tier C Piston Rod"
        }
    ],
    "idShort": "traceability/urn:uuid:f5efbf45-7d84-4442-b3b8-05cf1c5c5a0b"
}
```

<sub><sup>(C) 2021 Contributors to the Eclipse Foundation. SPDX-License-Identifier: CC-BY-4.0</sup></sub>

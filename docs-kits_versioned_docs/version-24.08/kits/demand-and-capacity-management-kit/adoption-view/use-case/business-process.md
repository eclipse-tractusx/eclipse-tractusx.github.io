---
id: business-process
title: Core Business Process
description: Exchange demand and capacity information to solve bottlenecks.
sidebar_position: 1
---

![DCM kit banner](/img/kit-icons/dcm-kit-icon.svg)

## TABLE OF CONTENTS

- [Business Roles and Functions](#business-roles-and-functions)
- [Material Demand](#material-demand)
- [Capacity Group](#capacity-group)
- [Match and Comparison of Demand and Capacity](#match-and-comparison-of-demand-and-capacity)
- [Collaboration](#collaboration)
- [User Journey](#user-journey)

## Business Roles and Functions

The core DCM business process is executed by two roles and uses two APIs as well as  two aspect models. The customer is responsible for `WeekBasedMaterialDemand`, the supplier for `WeekBasedCapacityGroup`. Within `WeekBasedCapacityGroup` the supplier has to link material demands.

|Function / Role|Customer|Supplier|
|-|-|-|
|Manage demand data|X||
|Inform supplier about demand|X||
|Manage capacity data||X|
|Link demand and capacity||X|
|Inform customer about capacity||X|
|Compare demand to capacity|X|X|
|Collaborate to resolve bottlenecks|X|X|

## User Journey

![User Journey](./resources/business-process_UserJourney.svg)

Figure: *Basic DCM user journey*

<!--
```mermaid
journey
    title Basic DCM User Journey
 section Exchange demand
        Manage demand:3: Customer
        Provide demand data:3: Customer
        Consume demand data:3: Supplier
section Exchange capacities
        Manage capacity:3: Supplier
        Link demand and capacity:3: Supplier
        Provide capacity data:3: Supplier
        Consume capacity data:3: Customer
section Match and Compare
        Match and compare demand and capacity:4: Customer, Supplier
        Identifiy problems:5: Customer, Supplier
section Collaborate
        Propose sulutions:6: Customer, Supplier
        Evaluate solutions:6: Customer, Supplier
        Simulate solutions:6: Customer, Supplier
        Decide on Measures:6: Customer, Supplier
        Solve problems:9: Customer, Supplier
```
-->
### Personas

The basic DCM user journey encompasses two key personas, each with distinct roles and responsibilities that highlight their value within the supply chain.

#### Customer

 Individuals that act as this persona may hold various titles within their organization, but share the common responsibility of managing material demand and ensuring that supply aligns with their forecasted needs. The value of DCM for the customer lies in the capability to provide clear visibility into future demand and to facilitate efficient communication and alignment with suppliers.

The responsibilities of the customer include:

- safeguarding sufficient capacity of his suppliers for required materials and prevent bottleneck situations
- allocation of production capacity on customer side
- production rough cut planning
- material allocation

#### Supplier

Individuals that act as this persona may hold various titles within their organization, but share the common responsibility of providing capacity data in response to the customer's material demand. The value of DCM for the supplier lies in the capability to receive material demand data, which enables them to plan and allocate resources effectively, ensuring they can meet the customer's demands.

The responsibilities of the supplier include:

- allocation of production capacity
- production rough cut planning
- material allocation
- communication to a customer business partner regarding capacity figures in a mid to - long term horizon
- resolving bottleneck situations

### User Journey Description

The starting point within the DCM user journey is the exchange of demand data, which is provided by the customer and consumed by the supplier as WeekBasedMaterialDemand. For an effective demand and capacity management the data needs to be of a certain quality. This includes sorting the demand into weekly buckets, extending the demand data 24 months into the future and subsequently keeping it up to data. Whether the customer has to manually prepare the demand data or it gets automatically generated and updated from existing systems, is not restricted by the Catena-X standards.

The exchange of demand data is followed by the exchange of capacity data, which is provided by the supplier und consumed by the customer. For an effective demand and capacity management the data needs to be of a certain quality. This included linking material demands to the capacity group ,providing a capacity quantity for every calendar week the customer provided demand quantities for, matching unit of measures correctly and utilizing advanced features like load factors and delta production in order to model demand and capacity management as closely to real life as possible. Whether the supplier has to manually prepare the capacity data or it gets automatically generated and updated from existing systems, is not restricted by the Catena-X standards. However matching material numbers and linking material demands to capacity groups will most likely required human intervention at some point.

After exchanging demand and capacity data  both customer and supplier do have the same view of the current situation and can begin matching and comparing the data. This is something that usually happening locally within the respective DCM application. Ideally the whole process of finding problems (bottleneck or surplus) is automated.

If either customer or supplier identify a problem they can collaborate by exchanging comments as described by the DCM standard or by communicating outside the Catena-X dataspace using email or online-meetings. Regardless of how communication is initiated and maintained solving an identified problem is always the result of proposing, evaluating and simulating potential solutions. Customers and supplier discuss potential measures, modify their demand and capacity respectively and exchange the modified data until a solution that works for both sides has been found.

Tools available to the customer for solving problems are fairly limited. They can increase or decrease demand quantities.

The supplier on the other hand has more options to solve problems. They can not only increase and decrease capacity quantities, but also use flexible capacity, load factors and delta production.

## Material Demand

![Guide Demand](./resources/business-process_guide_demand.svg)
<!--
```mermaid
block-beta
columns 4
block:Customer:2
A1[["One-Up (Customer)")
end
block:Supplier:2
A3("One-Down(Supplier)")
end
B1<["Manage"]>(down)
space:2
B4<["Manage"]>(down)
C1("Demand"):1
C2((" ")):1
C3((" ")):1
C4("Capacity"):1
space:4
space:1
E2("Match & Comparison"):2
space:1
space:4
G1((" "))
G2("Collaboration"):2
G4((" "))

##### FIX THE ARROWS BELOW FOR MERMAID DIAGRAM TO WORK and remove this LOC

C1->C2
C2->E2
C3->E2
C4->C3
E2->G2
G1->C1
G2->G1
G2->G4
G4->C4

classDef Demand fill:#FFA600,stroke:#FFFFFF,color:#000000
classDef Capacity fill:#B3CB2D,stroke:#FFFFFF,color:#000000
classDef DemCap fill:#D9B917,stroke:#FFFFFF,color:#000000
classDef Frame fill:#979797,stroke:#EAEAEA,color:#000000
classDef Highlite  stroke:#FF0000,stroke-width:4px
class A1,C1 Demand
class A3,C4 Capacity
class E2,G2 DemCap
class B1,B4,C2,C3,G1,G4 Frame
class C1 Highlite
```

-->

A material demand represents the need for a particular product, part, component or material over a certain time period in a specified quantity. Demand quantities must refer to a time period of one calendar week (weekly buckets).

The customer is responsible for publishing material demands to their supplier for upcoming time periods and it is strongly recommended to:

- Minimize any data gaps to the greatest extent possible by maintaining continuity and establishing consistency.
- Provide material demand data for at least nine months into the future to ensure that DCM participants have sufficient information to work with.
- Implement a rolling demand plan by continuously updating the planning horizon with recent data.
- Refresh the data at a minimum of once every four weeks.
- Align, ideally within a contract, the unit of measure for demand quantities (e.g., pieces, kilograms, metric tons) with the supplier before providing the demand.

The supplier must have the capability to consume the material demand data from the customer.

### Material Demand Structure

![Material Demand Structure](./resources/business-process_MDstructure.svg)
![Material Demand Structure Legend](./resources/business-process_MDstructure_Legend.svg)

Figure: *Material demand structure*
<!--
```mermaid
block-beta
columns 6
A("WeekBasedMaterialDemand"):6
B1("Supplier")
B2("Customer")
B3("changedAt")
B4("DemandSeries"):3
C1("MaterialDescriptionCustomer")
C2("MaterialNumberCustomer")
C3("MaterialDemandID")
C4("MaterialNumberCustomer")
C5("DemandCategory")
C6("CustomerLocation")
D1("InactiveFlag")
D2("UnitOfMeasure")
D3(" ")
D4("PointInTime")
D5("DemandQuantity")
D6(" ")

classDef Demand_must fill:#FFA600,stroke:#FFFFFF,color:#000000
classDef Capacity_must fill:#B3CB2D,stroke:#FFFFFF,color:#000000
classDef Demand_optional fill:#BF7100,stroke:#FFFFFF,color:#000000
classDef Capacity_optional fill:#617000,stroke:#FFFFFF,color:#000000

classDef Invis fill:#000000,stroke:#000000,color:#000000,opacity:0
class A,B1,B2,B3,B4,C1,C2,C3,C4,C5,C6,D4,D5 Demand_must
class D1,D2 Demand_optional
class D3,D6 Invis
```

```mermaid
block-beta
A["Demand data (MUST)"] style A fill:#FFA600,color:#F4F2F3
B["Demand data (optional)"] style B fill:#BF7100,color:#F4F2F3
```
-->

### Visualization Example

![Demand Example](./resources/business-process_ExampleDemand.svg)

Figure: *Visualizing demand quantities as bars*
<!--
```mermaid
---
   config:
    xyChart:
        width: 1200
        height: 700
        titlePadding: 10
        titleFontSize: 20
        showTitle: true
        plotReservedSpacePercent: 50 
    themeVariables:
        xyChart:
            backgroundColor: "#000000"
            titleColor: "#F4F2F3"
            xAxisLabelColor: "#F4F2F3"
            xAxisTitleColor: "#F4F2F3"
            xAxisTickColor: "#F4F2F3"
            xAxisLineColor: "#F4F2F3"
            yAxisLabelColor: "#F4F2F3"
            yAxisTitleColor: "#F4F2F3"
            yAxisTickColor: "#F4F2F3"
            yAxisLineColor: "#F4F2F3"
            plotColorPalette: "#FFA600,#B3CB2D,#809500,#219dd4"

---
    xychart-beta
    title "Example: Demand Data"
    x-axis [Week 1, Week 2, Week 3, Week 4, Week 5, Week 6, Week 7, Week 8]
 
 ##### FIX THE ARROW BELOW and remove this LOC to get mermaid working   
    
    y-axis 0 -> 6000
    bar [3000, 3000, 3000, 3000, 4000, 4000, 4000, 5000]
```
-->

## Capacity Group

![Guide Capacity](./resources/business-process_guide_capacity.svg)
<!--
```mermaid
block-beta
columns 4
block:Customer:2
A1[["One-Up (Customer)")
end
block:Supplier:2
A3("One-Down(Supplier)")
end
B1<["Manage"]>(down)
space:2
B4<["Manage"]>(down)
C1("Demand"):1
C2((" ")):1
C3((" ")):1
C4("Capacity"):1
space:4
space:1
E2("Match & Comparison"):2
space:1
space:4
G1((" "))
G2("Collaboration"):2
G4((" "))

##### FIX THE ARROWS BELOW FOR MERMAID DIAGRAM TO WORK and remove this LOC

C1->C2
C2->E2
C3->E2
C4->C3
E2->G2
G1->C1
G2->G1
G2->G4
G4->C4

classDef Demand fill:#FFA600,stroke:#FFFFFF,color:#000000
classDef Capacity fill:#B3CB2D,stroke:#FFFFFF,color:#000000
classDef DemCap fill:#D9B917,stroke:#FFFFFF,color:#000000
classDef Frame fill:#979797,stroke:#EAEAEA,color:#000000
classDef Highlite  stroke:#FF0000,stroke-width:4px
class A1,C1 Demand
class A3,C4 Capacity
class E2,G2 DemCap
class B1,B4,C2,C3,G1,G4 Frame
class C4 Highlite
```
-->

A capacity groups represents the answer to one ore more material demands. It contains the information on how a supplier intends to fulfill customer needs, by contrasting demands with capacities over a certain time period in a specified quantity. Capacity quantities must refer to a time period of one calendar week (weekly buckets).

The customer is responsible for publishing capacity groups to their customer and it is strongly recommended to:

- Minimize any data gaps to the greatest extent possible by maintaining continuity and establishing consistency.
- Provide capacity data for every calendar week that has associated demand data.
- Refresh the data at a minimum of once every four weeks.
- Align, ideally within a contract, the unit of measure for capacity quantities (e.g., pieces, kilograms, metric tons) with the customer and utilize lead factors as conversion factors, if applicable.

The supplier must provide capacity data to the customer, corresponding to the material demand data previously shared. Thereby, the supplier is acting as a data provider and the customer as a data consumer of the exchanged capacity group.  

The customer must have the capability to consume the capacity group data from the supplier.

### Capacity Group Structure

The Capacity Group is the entity where Material Demand and capacity information are matched and compared for the purpose of a collaborative DCM. Thereby, the Capacity Group builds the common view on the data exchanged between a customer and a supplier.  

The entity Capacity Group may be used, i.e. to combine capacities related to one or more machines, facilities or plants.  

![Capacity Group Structure](./resources/business-process_CGstructure.svg)

Figure: *Capacity group structure*
<!--
```mermaid
block-beta
columns 7
A("WeekBasedCapacityGroup"):7
B1("Supplier")
B2("Customer")
B3("CapacityGroupID")
B4("changedAt")
B5("Calendar Week"):3
C1("Inactive flag")
C2("UnitOfMeasure")
space
C4("CapacityGroupName")
C5("ActualCapacity")
C6("MaximumCapacity")
C7("AgreedCapacity")
space:4
D5("quantity")
D6("quantity")
D7("quantity")

classDef Demand_must fill:#FFA600,stroke:#FFFFFF,color:#000000
classDef Capacity_must fill:#B3CB2D,stroke:#FFFFFF,color:#000000
classDef Demand_optional fill:#BF7100,stroke:#FFFFFF,color:#000000
classDef Capacity_optional fill:#617000,stroke:#FFFFFF,color:#000000
class A,B1,B2,B3,B4,B5,C1,C2,C4,C5,C6,D1,D5,D6 Capacity_must
class C1,C2,C7,D7 Capacity_optional
```

```mermaid
block-beta
A["Capacity data (MUST)"] style A fill:#B3CB2D,color:#F4F2F3
B["Capacity data (optional)"] style B fill:#617000,color:#F4F2F3
```
-->

### Example Visualization

![Capacity Example](./resources/business-process_ExampleCapacity.svg)

Figure: *Visualizing capacity quantities as lines*
<!--
```mermaid
---
   config:
    xyChart:
        width: 1200
        height: 700
        titlePadding: 10
        titleFontSize: 20
        showTitle: true
        plotReservedSpacePercent: 50 
    themeVariables:
        xyChart:
            backgroundColor: "#000000"
            titleColor: "#F4F2F3"
            xAxisLabelColor: "#F4F2F3"
            xAxisTitleColor: "#F4F2F3"
            xAxisTickColor: "#F4F2F3"
            xAxisLineColor: "#F4F2F3"
            yAxisLabelColor: "#F4F2F3"
            yAxisTitleColor: "#F4F2F3"
            yAxisTickColor: "#F4F2F3"
            yAxisLineColor: "#F4F2F3"
            plotColorPalette: "#B3CB2D,#809500,#219dd4"

---
    xychart-beta
    title "Example: Capacity"
    x-axis [Week 1, Week 2, Week 3, Week 4, Week 5, Week 6, Week 7, Week 8]
##### FIX ARROW BELOW AND remove this LOC to get mermaid to work
    y-axis 0 -> 6000
    line Actual Capacity [3000, 3000, 4000, 4000, 3000, 3000, 3000, 3000]
    line Maximum Capacity [3000, 4000, 4000, 5000, 3000, 4000, 5000, 3000]
    line Agreed Capacity [5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000]
```

-->

<!--
```mermaid
block-beta
B["Actual Capacity"] style B fill:#B3CB2D,color:#F4F2F3
C["Maximum Capacity"] style C fill:#809500,color:#F4F2F3
D["Agreed Capacity"] style D fill:#219dd4,color:#F4F2F3
```
-->

### Capacity Types

Embedded into the WeekBasedCapacityGroup are

- **actual capacity** as the  planned available capacity of a supplier
- **maximum capacity** as the maximum releasable capacity of a supplier
- **agreed capacity**  as the understanding between customer and supplier, regardless of contractual obligations. It is optional.

In addition the difference between actual capacity and maximum capacity is commonly understood as **flexible capacity**.

### WeekBasedCapacityGroup Properties

A Capacity Group dataset comprises the following basic components:

|Properties|Description|
|-|-|
|Supplier|The Business Partner Number (BPNL) of the party providing materials to a customer|
|Customer|The Business Partner Number (BPNL) of the party requesting material from a supplier|
|Capacity Group ID|The Capacity Group ID uniquely identifies the capacity group within the business relationship between a supplier and its customer|
|Changed At|Point in time when the content (any property according to the data model) of the capacity group was changed, at the supplier, either by a human user or an automated process|
|Capacity Group Name|Name of the capacity group.|
|Inactive Flag|Indicates that this capacity group is currently not in use/maintained by the supplier|
|Unit of Measure|Unit of Measurement (UoM) for capacity quantities|
|Linked Demand Series|Set of demand series assigned tio this capacity group.|
|Capacities|A time series with week-based granularity along a given time period containing the capacity values|
|Unit of Measure is Omitted|Explicit indicator of whether the unit of measure is left out of the payload intentionally. If “true” it means the sending application sends the demand values without unit of measure intentionally and the unit of measure must not be contained in the payload. If “false” a unit of measure must be supplied|

Further properties are added at lower level below the “Capacities” property. A capacity time series contains the following components.

|Properties|Description|
|-|-|
|Actual Capacity|The actual capacity is the realistically planned output per calendar week and material for a specific customer in a specific unit of measure, considering all positive or negative impacts on this capacity|
|Agreed Capacity|The agreed capacity of a supplier for a specific customer material(s) within a capacity group. The agreed capacity must not constitute a legal obligation to deliver.|
|Maximum Capacity|The supplier's maximum capacity is the maximal available output per calendar week and material for a specific customer in a specific unit of measure. The maximum capacity thereby restricts the flexible capacity, as the flexible capacity is obtained from the difference of a supplier maximum capacity minus actual capacity|
|Point in Time|ISO Calendar Week of the given time series entry. UstIt must be given as a date of the Monday in the week.|

### Linking Capacity Groups to Material Demands

For a functional Capacity Group, the supplier must link it directly or indirectly to a Material Demand:

- **Direct linking** means that the Capacity Group links at least one Material Demand  
- **Indirect linking** means that the Capacity Group links to another Capacity Group which links at least one Material Demand. This is also referred to as **nesting**.

#### Direct Linking

![Direct Linking](./resources/business-process_DirectLinking.svg)
![Direct Linking Legend](./resources/business-process_DirectLinking_Legend.svg)

Figure: *Capacity group structure with linked material demand*

<!--
```mermaid
block-beta
columns 10
A1("WeekBasedCapacityGroup"):10
B1("Supplier")
B2("Customer")
B3("CapacityGroupID")
B4("changedAt")
B5("Calendar Week"):3
B8("DemandSeries"):3
C1("Inactive flag")
C2("UnitOfMeasure")
space
C4("CapacityGroupName")
C5("ActualCapacity")
C6("MaximumCapacity")
C7("AgreedCapacity")
C8("MaterialNumberCustomer")
C9("DemandCategory")
C10("CustomerLocation")
space:4
D5("quantity")
D6("quantity")
D7("quantity")
D8("PointInTime")
D9("quantity")

classDef Demand_must fill:#FFA600,stroke:#FFFFFF,color:#000000
classDef Capacity_must fill:#B3CB2D,stroke:#FFFFFF,color:#000000
classDef Demand_optional fill:#BF7100,stroke:#FFFFFF,color:#000000
classDef Capacity_optional fill:#617000,stroke:#FFFFFF,color:#000000
class A1,B1,B2,B3,B4,B5,C4,C5,C6,C7,D5,D6,D7 Capacity_must
class B8,C8,C9,C10,D8,D9 Demand_must
class Capacity_optional
class C1,C2,C7,D7 Capacity_optional
```

```mermaid
block-beta
A["Demand data (MUST)"] style A fill:#FFA600,color:#F4F2F3
B["Demand data (optional)"] style B fill:#BF7100,color:#F4F2F3
C["Capacity data (MUST)"] style C fill:#B3CB2D,color:#F4F2F3
D["Capacity data (optional)"] style D fill:#617000,color:#F4F2F3

```
-->
For the technical representation of a CapacityGroup the aspect model WeekBasedCapacityGroup is utilized.  

The aspect model WeekBasedCapacityGroup must be used by a supplier to provide capacity information to the customer.  

For further details refer to the semantic model in Chapter 3.2 and to the APIs in Chapter 4.2.  

A partner acting as a supplier sends a Capacity Group to its customer. In order to link demand series in the Capacity Group between customer and supplier, the following properties must be filled-in:  

- supplier
- customer
- materialNumberCustomer  
- customerLocation  
- demandCategory  

If there’s no complete match between supplier and customer data, it’s recommended to initiate collaboration (i.e. see chapter “Comments”)

The supplier has the option to mark a WeekBasedCapacityGroup as inactive (i.e. the capacity is obsolete), in this case the capacity will not be considered in the demand-capacity matching. However, the WeekBasedCapacityGroup can be reactivated again.

### Building n-tier chains via capacity groups

Building supply chain via capacity groups is crucial to improve resiliency, transparency and efficiency along the value chain. Using the individual one-to-one capacity groups between one-ups and one-downs step by step builds the whole supply network. This enables all partners to collaborate along the whole value chain and navigate through complex and dynamic market conditions.  

The following figure illustrates how plastic granulate ends up being used in the housing of a control unit and how this would be viewed from a birds eye perspective.

```mermaid
flowchart BT
    subgraph CG1["Capacity Group 1                     (OEM - Tier1)"]
        cg11UP[One-Up]
        cg1Material[Control Unit]
        cg11DOWN[One-Down]
    end
    subgraph CG2["Capacity Group 2                     (Tier1 - Tier2)"]
        cg21UP[One-Up]
        cg2Material[Case]
        cg21DOWN[One-Down]
    end
    subgraph CG3["Capacity Group 3                     (Tier2 - Tier3)"]
        cg31UP[One-Up]
        cg3Material[Granulate]
        cg31DOWN[One-Down]
    end
cg3Material-->cg2Material
cg2Material-->cg1Material
style cg11UP fill:#707070,color:#ffffff
style cg1Material fill:#FFFFFF,color:#707070
style cg11DOWN fill:#046b99,color:#ffffff
style cg21UP fill:#046b99,color:#ffffff
style cg2Material fill:#FFFFFF,color:#707070
style cg21DOWN fill:#219dd4,color:#000000
style cg31UP fill:#219dd4,color:#000000
style cg3Material fill:#FFFFFF,color:#707070
style cg31DOWN fill:#575757,color:#ffffff
```

Figure: *A small supply chain built by three capacity groups*

The following figure illustrates the flow of demand and capacity data through the supply network. Capacity and demand blocks are placed according to responsibility. Data exchange that is happening within the Catena-X dataspace is denoted by arrows with "Provide" written on them.

```mermaid
flowchart LR
    subgraph t0[OEM]
        car
        t0a[Demand]
        t0b[Demand]
    end
    subgraph t1[Tier 1]
        t1a[Capacity]
        t1b[Capacity]
        t1c[Demand]
    end
    subgraph t2[Tier 2]
        subgraph t2py[Plant Y]
            t2pya[Capacity]
            t2pyb[Demand]
            t2pyc[Demand]
        end
        subgraph t2pz[Plant Z]
            t2pza[Demand]
            t2pzb[Demand]
            t2pzc[Capacity]
        end
    end
    subgraph t3a[Tier 3]
        t3aa[Capacity]
    end
    subgraph t3b[Tier 3]
        t3ba[Capacity]
        t3bb[Capacity]
    end
t0a-->car
t0b-->car
t1a--"Provide"-->t0a
t0a--"Provide"-->t1a
t1b--"Provide"-->t0b
t0b--"Provide"-->t1b
t1c-->t1a
t1c-->t1b
t2pzc--"Provide"-->t1c
t1c--"Provide"-->t2pzc
t2pza-->t2pzc
t2pzb-->t2pzc
t2pya--"Provide"-->t2pza
t2pza--"Provide"-->t2pya
t3bb--"Provide"-->t2pzb
t2pzb--"Provide"-->t3bb
t2pyb-->t2pya
t2pyc-->t2pya
t3ba--"Provide"-->t2pyc
t2pyc--"Provide"-->t3ba
t3aa--"Provide"-->t2pyb
t2pyb--"Provide"-->t3aa
classDef Demand fill:#FFA600,stroke:#FFFFFF,color:#000000
classDef Capacity fill:#B3CB2D,stroke:#FFFFFF,color:#000000
classDef CG1 fill:#B3CB2D,color:#000000
classDef CG2 fill:#a0b626,color:#000000
classDef CG3 fill:#8da01e,color:#000000
classDef CG4 fill:#7a8b17,color:#FFFFFF
classDef CG5 fill:#66750f,color:#FFFFFF
classDef CG6 fill:#536008,color:#FFFFFF
classDef CG7 fill:#404a00,color:#FFFFFF
classDef Car fill:#219DD4,color:#000000
class t1a,t0a CG1
class t1b,t0b CG6
class t3aa,t2pyb CG2
class t3ba,t2pyc CG3
class t2pzb,t3bb CG4
class t2pya,t2pza CG7
class t2pzc,t1c CG5
class car Car
```

![N-Tier  Linking Legend Legend](./resources/business-process_nTierLinking_Legend.svg)

Figure: *A small supply network built by seven capacity groups*

<!--
```mermaid
block-beta
1["CapacityGroup 1"] style 1 fill:#B3CB2D,color:#000000
2["CapacityGroup 2"] style 2 fill:#a0b626,color:#000000
3["CapacityGroup 3"] style 3 fill:#8da01e,color:#000000
4["CapacityGroup 4"] style 4 fill:#7a8b17,color:#FFFFFF
5["CapacityGroup 5"] style 5 fill:#66750f,color:#F4F2F3
6["CapacityGroup 6"] style 6 fill:#536008,color:#F4F2F3
7["CapacityGroup 7"] style 7 fill:#404a00,color:#F4F2F3
```
-->
## Match and Comparison of Demand and Capacity

![Guide Match](./resources/business-process_guide_match.svg)
<!--
```mermaid
block-beta
columns 4
block:Customer:2
A1[["One-Up (Customer)")
end
block:Supplier:2
A3("One-Down(Supplier)")
end
B1<["Manage"]>(down)
space:2
B4<["Manage"]>(down)
C1("Demand"):1
C2((" ")):1
C3((" ")):1
C4("Capacity"):1
space:4
space:1
E2("Match & Comparison"):2
space:1
space:4
G1((" "))
G2("Collaboration"):2
G4((" "))

##### FIX THE ARROWS BELOW FOR MERMAID DIAGRAM TO WORK and remove this LOC

C1->C2
C2->E2
C3->E2
C4->C3
E2->G2
G1->C1
G2->G1
G2->G4
G4->C4

classDef Demand fill:#FFA600,stroke:#FFFFFF,color:#000000
classDef Capacity fill:#B3CB2D,stroke:#FFFFFF,color:#000000
classDef DemCap fill:#D9B917,stroke:#FFFFFF,color:#000000
classDef Frame fill:#979797,stroke:#EAEAEA,color:#000000
classDef Highlite  stroke:#FF0000,stroke-width:4px
class A1,C1 Demand
class A3,C4 Capacity
class E2,G2 DemCap
class B1,B4,C2,C3,G1,G4 Frame
class E2 Highlite
```

-->

Both customer and supplier need to apply the same logic when comparing demand and capacity data in order to get the same results and come to identical conclusions.

The standard describes exactly which scenario leads to the three possible matching results:

- Zero deviation
- Surplus
- Bottleneck

Within a DCM application those three matching results are commonly represented as a traffic light status, with zero deviation and surplus being green and bottleneck being orange or red, depending on whether demand is higher than maximum capacity or just actual capacity.

While customers might not feel impacted by a surplus, because the demand is matched, it still represents capacity that the supplier could better utilize.

For ease of use demand and capacity data should be shown on the same graph and colored in appropriately, within a DCM application.

![Capacity Match and Compare](./resources/business-process_ExampleMatchCompare.svg)

Figure: *Visualizing the comparison of demand and capacity quantities*

<!--
```mermaid
---
   config:
    xyChart:
        width: 1200
        height: 700
        titlePadding: 10
        titleFontSize: 20
        showTitle: true
        plotReservedSpacePercent: 50
    themeVariables:
        xyChart:
            backgroundColor: "#000000"
            titleColor: "#F4F2F3"
            xAxisLabelColor: "#F4F2F3"
            xAxisTitleColor: "#F4F2F3"
            xAxisTickColor: "#F4F2F3"
            xAxisLineColor: "#F4F2F3"
            yAxisLabelColor: "#F4F2F3"
            yAxisTitleColor: "#F4F2F3"
            yAxisTickColor: "#F4F2F3"
            yAxisLineColor: "#F4F2F3"
            plotColorPalette: "#FFA600,#d91e18,#809500,#ffffff,#046b99,#219dd4"
---
    xychart-beta
    title "Example: Demand and Capacity Data Matching and Comparison within Capacity Group"
    x-axis [Week 1, Week 2, Week 3, Week 4, Week 5, Week 6, Week 7, Week 8]
    y-axis "." 0 -> 6000
    bar [3000, 3000, 3000, 3000, 4000, 4000, 4000, 5000]
    bar [0,0,0,0,4000,0,0,5000]
    bar [3000,3000,3000,3000,0,0,0,0]
    line Actual Capacity [3000, 3000, 4000, 4000, 3000, 3000, 3000, 3000]
    line Maximum Capacity [3000, 4000, 4000, 5000, 3000, 4000, 5000, 3000]
    line Agreed Capacity [5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000]

```

-->

<!--
```mermaid
block-beta
columns 3
A["Demand over actual capacity"] style A fill:#d91e18,color:#F4F2F3
B["Demand over actual but within maximum capacity"] style B fill:#FFA600,color:#F4F2F3
C["Demand within actual capacity"] style C fill:#809500,color:#F4F2F3
D["Actual Capacity"] style D fill:#FFFFFF,color:#000000
E["Maximum Capacity"] style E fill:#046b99,color:#000000
F["Agreed Capacity"] style F fill:#219dd4,color:#000000
```
-->

## Collaboration

![Guide Collaboration ](./resources/business-process_guide_collab.svg)

<!--

```mermaid
block-beta
columns 4
block:Customer:2
A1[["One-Up (Customer)")
end
block:Supplier:2
A3("One-Down(Supplier)")
end
B1<["Manage"]>(down)
space:2
B4<["Manage"]>(down)
C1("Demand"):1
C2((" ")):1
C3((" ")):1
C4("Capacity"):1
space:4
space:1
E2("Match & Comparison"):2
space:1
space:4
G1((" "))
G2("Collaboration"):2
G4((" "))

##### FIX THE ARROWS BELOW FOR MERMAID DIAGRAM TO WORK and remove this LOC

C1->C2
C2->E2
C3->E2
C4->C3
E2->G2
G1->C1
G2->G1
G2->G4
G4->C4

classDef Demand fill:#FFA600,stroke:#FFFFFF,color:#000000
classDef Capacity fill:#B3CB2D,stroke:#FFFFFF,color:#000000
classDef DemCap fill:#D9B917,stroke:#FFFFFF,color:#000000
classDef Frame fill:#979797,stroke:#EAEAEA,color:#000000
classDef Highlite  stroke:#FF0000,stroke-width:4px
class A1,C1 Demand
class A3,C4 Capacity
class E2,G2 DemCap
class B1,B4,C2,C3,G1,G4 Frame
class G2 Highlite
```
-->

Collaboration is key within the DCM process. It is the final part of the DCM user journey, where actual solutions for problems (surplus and bottlenecks) are proposed, discussed and finally deployed.

In order to facilitate collaboration with the Catena-X dataspace the DCM standards describes the exchange of comments, using an own aspect model and API. Communication features outside the Catena-X dataspace, such as eMail, phone calls, online meetings, etc. are not prohibited and should be used as the individual customers and suppliers see fit.

For further details, please refer to [CX-0128 Demand and Capacity Management Data Exchange][StandardLibrary].

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode)

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023,2024 ZF Friedrichshafen AG
- SPDX-FileCopyrightText: 2023,2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)
- SPDX-FileCopyrightText: 2023,2024 SAP SE
- SPDX-FileCopyrightText: 2023,2024 Volkswagen AG
- SPDX-FileCopyrightText: 2023,2024 Mercedes Benz Group AG
- SPDX-FileCopyrightText: 2023,2024 BASF SE
- SPDX-FileCopyrightText: 2023,2024 SupplyOn AG
- SPDX-FileCopyrightText: 2023,2024 Henkel AG & Co.KGaA
- SPDX-FileCopyrightText: 2023,2024 Fraunhofer-Gesellschaft zur Förderung der angewandten Forschung e.V (Fraunhofer)
- SPDX-FileCopyrightText: 2023,2024 Contributors to the Eclipse Foundation

[StandardLibrary]: https://catenax-ev.github.io/docs/next/standards/CX-0128-DemandandCapacityManagementDataExchange

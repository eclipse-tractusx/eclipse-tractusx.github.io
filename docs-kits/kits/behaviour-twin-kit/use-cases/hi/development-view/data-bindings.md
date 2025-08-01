﻿---
id: data-bindings
title: Data Bindings
description: Behaviour Twin KIT
---

<div style={{display:'block'}}>
  <div style={{display:'inline-block', verticalAlign:'top'}}>

![Behaviour Twin KIT -- Health Indicator banner](@site/static/img/kit-icons/behaviour-twin-hi-kit-icon-mini.svg)

  </div>
  <div style={{display:'inline-block', fontSize:17, color:'rgb(255,166,1)', marginLeft:7, verticalAlign:'top', paddingTop:6}}>
Behaviour Twin KIT -- Health Indicator
  </div>
</div>

Applies to role: *HI data provider*

## DATA BINDING FOR RELATIONAL DATA

The usage data for different use cases like *Health Indicator*, [*Remaining useful Life*](../../rul/overview) and others utilize the same data sources and data types (load spectra). The load spectrum types may vary, but all the different types consists of the same structure and data types. Because of that, they all can be provided by the same data (graph) asset. The provisioning is described in the [general Data Bindings section](../../../software-development-view/data-bindings).

More details about how to bind and provide data can be found at the [Agents KIT's Operation View](../../../../knowledge-agents-kit/operation-view/provider).

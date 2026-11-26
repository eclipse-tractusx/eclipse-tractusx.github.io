---
slug: committer-meeting-12-04-2024
title: Commiter Meeting 12.04.2024
authors: 
    - stephan_bauer
tags: [meeting-minutes, community, committer-meeting]
---

## Committer meeting - meeting minutes

### Open Planning Participation of committers

The open planning is one of the most important meetings. I think 14 (of 41) committers were present, but only two used their voice ;) what about the others?

=> Maybe we should talk more beforehand, about the importance of the meeting. Responsibilities and expectations of attendance.

### Label structure

The labels on the features are very important for dependencies and filtering. Yes we have a lot, but we need more ;) but on the other hand we can also delete some ;)

**Suggestions:**

#### New needed

- ssi
- data-sovereignty
- policy-hub
- policy-registry
- issuer-component
- authority-registry

=> discussed -> create the labels

- open-discussions (color: red)
- Prep-P14 -> maybe Prep-R2412 -> do we need the specific prep label?
- Prep-P15
- Standards (marks tickets which have impact on standards)
- Breaking Change (marks breaking change tickets)

#### Changes needed

- miw => rename to identity-wallet

#### Delete (probably we need to discuss this once since a deletion has impacts…)

- kit (reason: each kit has an own label already)
- foss
- go
- PI12 (ideally we just inactive it to not lose it on the old tickets)
- Prep-P11 (ideally we just inactive it to not lose it on the old tickets)
- Prep-P12 (ideally we just inactive it to not lose it on the old tickets)
- Project management
- Test results
  
#### Additionally I like to suggest a clear color coding

- All Product labels - ocean blue
- All Prep-Pxx label – grey
- All highlight labels – red
- All UseCase labels – green -> can we delete this?
- All Expert group labels - yellow

=> HTML color code is used

### Clean Board

My feeling is, we will have round about 60 features for 24.08 -> all good. Happy about it. But on the board itself we have more than 200. I understand its good to have some features in inbox/backlog... but i think the gap is to big ... and i think a lot of them could be deleted ;(

=> discussed and decided: Friendly reminder -> after a specific amount ot time the issues are deleted automatically

### Views an project board

The views (tabs) should be cleaned up) which views are still needed?

- Feature view (issuetype `feature`) -> for Expert Groups / Committees / Developer
- QGate View (issuetype `realease_ac`)
- ???

### Future workingmodel

Instead of miro we could work with GitHub Project as agenda/issuetracking. e.g. [example board](https://github.com/orgs/eclipse-tractusx/projects/61)

=> lets try it

### Custom Attribute

Since we work together e.V/Open Source it would be beneficial if we could map the features to the related expert (groups) therefore i would like to discuss a custom attribute, which holds the related committee/expertgroup (dedicated list) -> This would help to filter and also get a better feeling

=> prepare a poc -> Tom , Stephan

### Featurequality

Since sometimes the quality (how is a feature described, did you clarify your dependencies, did you talk to your committer, is the time allocated) i would like to extend the feature template to guide a little bit more. For example a checklist like:

- \[ \] i have talked to dependent components
- \[ \] i have talked to my committers
- \[ \] i will contribute on this features
- ...

-> mention the release process via link in the template, keep the template simple
-> link the contribution guidelines

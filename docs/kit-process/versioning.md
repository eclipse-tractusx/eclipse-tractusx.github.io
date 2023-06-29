---
title: Versioning scheme
sidebar_position: 2
---

```md
    **********************************************
    ** DISCLAIMER                               **
    ** THIS PROCESS IS STILL UNDER DEVELOPMENT  **
    ** FEEDBACK IS APPRECIATED                  **
    **********************************************
```

To achieve some uniformity, we prescribe a versioning scheme for KITs. Here we use a modified semantic versioning. With semantic versioning, the version is composed of three parts as follows:

`MAJOR.MINOR.PATCH`

An increment in Major component marks a change that makes the current version incompatible with the previous versions. A minor increment, on the other hand, indicates the addition of a new feature or component. An increment in the Patch component marks an unimportant change.

For a kit we distinguish between two phases incubating and graduated.

## Incubating Phase

During the incubating phase, the major version must be 0. This means that the version of a KIT that is not yet graduated always has the format 0.x.y. The minor component is incremented exactly when an artifact is completed and the patch component is incremented for all other changes.

As soon as a KIT moves to the Graduated stage its version is set to 1.0.0. after that the Graduated Phase Versioning applies.

## Graduated Phase

Upon reaching the Graduation Phase, a KIT is production ready and can be in use. Since the KITs are maintained and further developed by the community, changes can be made that result in an incompatibility. In the Graduation phase we use the same versioning as in the incubating phase only that we extend it by a rule. We have defined a set of central artifacts that can trigger a major increment. I.e. by updating artifacts or adding optional artifacts that do not yet exist, only the minor component is increased. The major component must be increased if one of the defined artifacts is changed in such a way that an incompatibility arises. In the rules these are components that define interfaces, schemas or similar. Below you will find a list of these artifacts.

### Major-Artefacts

These may trigger a major increase if they exists.

- Semantic Model
- Logic/Schema
- API Specification

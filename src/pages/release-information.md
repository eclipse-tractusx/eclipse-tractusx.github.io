# Release Information

## Introduction

[Catena-X Standards](https://catena-x.net/de/standard-library) are the foundation for certifying any software component operating in the Catena-X data space. Those standards are the binding reference to obtain a valid certificate.

To make adopting the latest Catena-X standards easier, reference implementations are provided through the Elipse Tractus-X Project. Releases of these reference implementations happen four times a year using a [calendar versioning](https://calver.org/) scheme, and include the operating system consisting of core services, enablement services, and KITs.

Please check the [Change Log](/CHANGELOG) for content, known knowns, and backward compatibility since the calendar versioning scheme readily shows the year and month of release.

![Release information cycles chart](@site/static/img/release-information-cycles.png)

## Release Cycle

### Feature Definition (2 Weeks)

- Feature discussions per product team (ongoing through the year)
- Selection of features targeting for a given release
- Feature readiness latest by alignment and planing meetings

**Milestone:** Enhancements Freeze (in week 2)

### Feature Work (ca. 10 weeks)

- Feature development and reviews (in sprints / iterations)
- Unit and integration tests

**Milestone:** Feature / Code Freeze (in week 12)

### Test & Bug Fixing (ca. 4 Weeks)

- System and (E2E) acceptance tests
- Bug fixing and testing (iterative)

Release Freeze (in week 16 )

### Release

- Enhancement pass all relevant release gates
- Release communication (e.g. update of change log / release notes)

Release (in week 20)

## The next two Release Cycles in detail

```mermaid
gantt
    title Next Release Cycles
    dateFormat  DD-MM-YYYY
    todayMarker off
    
    section Release v23.12
    Feature Definition           :a1, 15-07-2023, 07-08-2023
    Feature Enhancement 07/08/23 :milestone, after a1, 0d
    Feature Work                 :a2, 07-08-2023, 13-10-2023
    Feature Freeze 13/10/23      :milestone, 13-10-2023, 0d
    Test & Bug Fixing            :a3, 13-10-2023, 06-11-2023
    Release Freeze 06/11/23      :milestone, 06-11-2023, 0d
    Release                      :a4, 06-11-2023, 08-12-2023
    Release 08/12/23             :milestone, 08-12-2023, 0d
    
    section Release v24.02
    Feature Definition           :b1, 10-10-2023, 30-10-2023
    Feature Ready 30/10/23       :milestone, after b1, 0d
    Feature Work                 :b2, after b1, 08-12-2023
    Feature Freeze 08/12/23      :milestone, after b2, 0d
    Test & Bug Fixing            :b3, after b2, 26-01-2024
    Release Freeze 26/01/24      :milestone, after b3, 0d
    Release                      :b4, after b3, 23-02-2024
    Release 23/02/24             :milestone, after b4, 0d
```

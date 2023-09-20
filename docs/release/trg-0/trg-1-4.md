---
title: TRG 1.04 - Diagrams as Code
---

| Status | Created       | Post-History          |
|--------|---------------|-----------------------|
| Draft  | 20-Sept-2023  | created initial Draft |
|        |               |                       |

## Why

To have an easier approach to update current static files and have a better overview of the changes within the product pictures.

This helps people to understand our workflows within our products and make it easier to understand the product itself.
Also updating the static files will be easier and faster to do for every committer or maintainer of our repositories.

## Description

All static files **must** be created with code and also stored as `.svg` file within your product repository.
After a committers [decision](https://github.com/eclipse-tractusx/sig-infra/discussions/19) there are 2 languages accepted, either [PUML](https://plantuml.com/en/) or [Mermaid](https://mermaid.js.org/).
These code files (`.puml`,`.mmd`,`mermaid`) and static `.svg` files **must** be stored within the `docs/static` folder.
In addition to this you can integrate mermaid diagrams also directly into your markdown files as code snippets.

This includes:

- diagrams
- flowcharts
- sequence diagrams
- state diagrams
- gantt charts
- etc.

## PlantUML / Mermaid / Markdown snippets

### PlantUML example

```plantuml
@startuml
(First usecase)
(Another usecase) as (UC2)
usecase UC3
usecase (Last\nusecase) as UC4
@enduml
```

![example-as-image](https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuT9moomgBb4eBKvDJYnErUJISCpBByb8BOABA2GMAsY4EXjfSa5554ATZU5i3P_4ufAOF2J5G6aJBeVKl1IWwG00)

### Mermaid example

```markdown
flowchart TD
    A[Committer] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[Mobile Phone]
    C -->|Three| F[fa:fa-car Car]
```

[![example2-as-image](https://mermaid.ink/img/pako:eNpVkEFug0AMRa9iedVK4QIsKiXQZpOokZodsHDBMKMwYzQxiiLg7h3KpvXK8n_fX_aEtTSMKba9PGpDQeGalx5i7YtMnLOqHCpIkrf5yApOPD9nOLwcBe5GhsH67nXjDysE2XRaMQY11t-WTcp-_Z-eZ8iLEw0qQ_VXuT5khvfiLN-2Z7iYGPJfN4Gj96NoKW0pqSlARqHCHToOjmwTD5hWQ4lq2HGJaWwbCrcSS79EjkaVr6evMdUw8g7HoSHl3FIXyGFc2t_jlBurEs7bR2rxre1w-QHjzV4u?type=png)](https://mermaid.live/edit#pako:eNpVkEFug0AMRa9iedVK4QIsKiXQZpOokZodsHDBMKMwYzQxiiLg7h3KpvXK8n_fX_aEtTSMKba9PGpDQeGalx5i7YtMnLOqHCpIkrf5yApOPD9nOLwcBe5GhsH67nXjDysE2XRaMQY11t-WTcp-_Z-eZ8iLEw0qQ_VXuT5khvfiLN-2Z7iYGPJfN4Gj96NoKW0pqSlARqHCHToOjmwTD5hWQ4lq2HGJaWwbCrcSS79EjkaVr6evMdUw8g7HoSHl3FIXyGFc2t_jlBurEs7bR2rxre1w-QHjzV4u)

### Example Mermaid into Markdown

````markdown
```mermaid
flowchart TD
    A[Committer] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[Mobile Phone]
    C -->|Three| F[fa:fa-car Car]
```
````

```mermaid
flowchart TD
    A[Committer] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[Mobile Phone]
    C -->|Three| F[fa:fa-car Car]
```

## Technical requirements

- [PlantUML](https://plantuml.com/en/) or [Mermaid](https://mermaid.js.org/) must be used to create the static files.
- Live Mermaid Editor: [Mermaid Live Editor](https://mermaid.live/edit)
- Live PlantUML Editor: [PlantUML Live Editor](https://www.planttext.com/)

## GitHub workflows

Reusable workflows for each language can be found here:

- [Generate static Mermaid Files](https://github.com/eclipse-tractusx/sig-infra#generate-static-mermaid-files)
- [Generate static PlantUML Files](https://github.com/eclipse-tractusx/sig-infra#generate-static-plantuml-files)

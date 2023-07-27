---
title: Automate KIT documentation update
sidebar_position: 7
---

For each KIT that should be automated add the following to the build-and-deploy workflow.

```yaml
 - name: check out kit repo
          uses: actions/checkout@v3
          with: 
            # add the kit repository
            repository: "<repo-owner>/<repo name>"
            path: <repo name>
        - name: copy docs
          run: |
            # create path for the KIT Repository
            mkdir -p main-repo/docs/test-kit &&
            # copy documentation to website
            cp -r <repo name>/path/to/documentation main-repo/docs/<repo name>
```

Fill the sections in these brackets "< >"" with the necessary information.

**Note:**

- make sure that the structure within the documentation of the KIT is as expected.

---
sidebar_position: 6
title: Building
---

If you do not want to compile the sources on your own, you may directly start with [Deployment](../operation-view/deployment)

If you are a member of the Catena-X consortium, you could directly start with [Interacting with the Pilot APIs](../operation-view/sample).

## Source Repository

You will find the source code of the Pilot under [https://github.com/catenax-ng/product-knowledge](https://github.com/catenax-ng/product-knowledge/tree/v0.5.5-pilot)

Be sure to initialise the git submodules after cloning the repo

```console
git submodule update --init --recursive
```

## Building Packages and Running Locally

You will need a JDK>=11 installed in the JAVA_HOME environment variable.
You will need internet access and (optionally) a proxy installed in the HTTP_PROXY_HOST and HTTP_PROXY_PORT environment variables.
You will need node.js/npm installed.
The build process will install a (local) maven build tool during the run.
You will need a valid github user with a reasonably permissive PAT (personal access token).

```console
export GITHUB_ACTOR=<yourgithubusername>
export GITHUB_TOKEN=<yourpat>
```

You will need to configure the skill gym with the right API Key and connector information for the localhost environment

```console
cat > ux/skill_gym/.env << EOF
REACT_APP_SKILL_CONNECTOR_CONTROL=http://localhost:8282
REACT_APP_SKILL_CONNECTOR_DATA=http://localhost:8284
REACT_APP_SKILL_CONNECTOR_AUTH_HEADER_KEY=X-Api-Key
REACT_APP_SKILL_CONNECTOR_AUTH_HEADER_VALUE=bar
EOF
```

### Building Knowledge Agents

Building the packages can be done with or without docker images. If you are sitting behind a proxy, you could
use the appropriate environment variables HTTP_PROXY_HOST and HTTP_PROXY_PORT.

```console
./mvnw -s settings.xml install -Pwith-docker-image -Dhttps.proxyHost=${HTTP_PROXY_HOST} -Dhttps.proxyPort=${HTTP_PROXY_PORT} 
cd ux
npm install -g jest
npm run init:dev
cd ..
```

### Building under MacOS/M=>1

Since we are not (no more) using gradle, there is no particular MacOS environment kung-fu anymore, as there was in the [spike](spike). Also the default docker images (see above)
tailored to linux/amd64 run perfectly under arm64-qemu.

Only if you want to build without emulation (and do not plan to publish the tags to our registries), you may want to call

```bash
# Use the right docker platform when calling mvnw
./mvnw -s settings.xml install -Dplatform=linux/arm64
```

### Running Knowledge Agents (Locally)

Running Knowledge Agents locally simply uses the docker-compose infrastructure

```bash
cd infrastructure
docker-compose build
docker-compose up &
cd ..
cd ux
npm run start:skillgym
```

### Running under MacOS/M=>1

Only if you want to run without emulation (and do not plan to publish the tags to our registries), you may prepend

```bash
# Use the right docker platform when calling docker-compose
export DOCKER_PLATFORM=linux/arm64
```

For inquiries please contact [Tom Buchert](mailto:tom.buchert@t-systems.com)

  For more information see

* Our [Adoption](../adoption-view/intro) guideline
* The [Layers & Modules](modules) Architecture
* Our [Build](build) instructions
* The [Deployment](../operation-view/deployment) guide

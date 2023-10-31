---
title: Prerequisites
sidebar_position: 1
---


## Preface

The components and tools that are described here are to be understood as a proposal from Catena-X and not as standards that must be used. Using the proposed software stack of this tutorial will make it easier to complete it. Nevertheless, if your company policy requires e.g. the use of open stack, or you can't use docker containers or kubernetes, the Catena-X components will also work, you might just need a little extra effort.

You can either complete the tutorial in a cloud space (e.g. AWS or Azure) or locally. If you choose to run the tutorial locally, make sure that your machine fulfils the minimal performance requirements.

## Required Skills and Technologies

AAs mentioned in the introduction, no preliminary knowledge about Catena-X is required. However, to complete the tutorial you will have to work with the following tech stack. A basic understanding of those technologies is advised.

- Cloud Environment (AWS/Azure) or Local Machine with at least 16GB RAM, 20GB free storage
- Docker
- Kubernetes
- Minikube (for local)
- Helm
- Terraform

## Using cloud based environments

We recommend to use cloudbased environmengts like (AWS, Google or Azure) for most cases.

## Setting up your own environment on local systens

IIn case you want to install Catena-X components or Kits directly on your local system you need the following:

- Your local system should run a Linux Version (Debian or Ubuntu are recommended)
- You need super user privileges (either root access or the right to use sudo)
- Access to the internet (see next section)

### Access to the Internet

Most companies run are more complex network, usually direct open access to the Internet is not allowed. Firewalls and Proxy server isolate the local network and most communication links are blocked (by blocking ports and external URLs).

Before you start configuring your environment ensure that you know your

- network addresses
- routes (and router) as well as gateways
- proxy server

You may need the support of your local IT department. Once you are confident to understand the network layout you can start to configure (or ask to configure) the different ports and URLS which are required for the installation process. For the implemented installation process as configured you will need access to a couple of URLs for different repositories. Those URLs will be passed only if your proxy server is configured to forward the following whitelist of URLs

### URL Whitelist

#### Specific URLs​

- .download.docker.com​
- .k8s.io​
- .io/v2​
- .charts.bitnami.com​
- .download.docker.com/linux/ubuntu/gpg​
- .storage.googleapis.com​
- .hub.docker.com                                     # Docker Hub​
- .kubernetes.io                                      # Kubernetes​
- .helm.sh                                            # Helm Charts​
- .hashicorp.com​
- .github.io​

#### General URLs​

- .access.redhat.com/solutions/15840                  # yum​
- .apps.fedoraproject.org/packages                    # dnf​
- .software.opensuse.org                              # zypper​
- .snapcraft.io                                       # snap​
- .pypi.org                                           # pip​
- .packagist.org                                      # composer​
- .deb.debian.org                                                           # Debian Package Updates​
- .mirrors.centos.org                                 # CentOS Package #Updates​
- .mirrors.fedoraproject.org                   # Fedora Package Updates​
- .download.opensuse.org                       # openSUSE Package Updates​
- .packages.debian.org                         # Debian Package Repositories​
- .archlinux.org                               # Arch Linux Package Repositories​
- .packages.gentoo.org                         # Gentoo Package Repositories​
- .pkgs.org                      # RHEL/CentOS Package Repositories​
- .kernel.org                    # Linux Kernel Updates​
- .git.kernel.org/pub/scm/linux/kernel/git/firmware/linux-firmware.git    # Linux Firmware Updates​
- .sourceforge.net               # SourceForge​
- .npmjs.com                     # Node Package Manager (NPM)​
- .rubygems.org                  # RubyGems​
- .ubuntu.com                    # Ubuntu Package Updates​
- .github.com​
- .raw.githubusercontent.com​

TODO: Add list s:

- Ports to be open

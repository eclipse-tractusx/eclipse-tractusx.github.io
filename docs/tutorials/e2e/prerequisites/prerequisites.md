---
title: Prerequisites
sidebar_position: 1
---

## Preface

The components and tools that are described here are to be understood as a proposal and not as standard that must be used. Using the proposed software stack of this tutorial will make it easier to complete it. Nevertheless, if your company policy requires e.g. the use of open stack, or you can't use docker containers or kubernetes, the Catena-X components will also work, you might just need a little extra effort.

:::info

You can either complete the tutorial in a cloud space (e.g. AWS or Azure) or locally. If you choose to run the tutorial locally, make sure that your machine fulfils the minimal performance requirements.

:::

## Required Skills and Technologies

As mentioned in the introduction, no preliminary knowledge about Catena-X is required. However, to complete the tutorial you will have to work with the following technical software stack. A basic understanding of those technologies is advised.

- Cloud Environment (AWS/Azure) or a local machine
- Docker
- Kubernetes
- Kubectl
- Minikube
- Helm
- X-Environment (xterm)
- a browser (we will use google-chrome) to be used for the minikube dashboard and the portal

## Chosing your environment

The tutorial is designed to be used in cloud environments, such as AWS, Google or Azure. If you intend to build your own local environment independently of Cloud based offers, you may use this tutorial as well. In this case you need to ensure, you have the right technical software stack installed, see below.

## Setting up your own environment on local systems

In case you want to install Tractus-X components or [Kits] directly on your local system you need the following:

- Access to the internet (see next section)
- One local server instance, either a physical server or a virtual machine with at least 4 CPUs, 10 GB [RAM] and 20 GB storage
- Your local system should run a Linux Version (Debian or Ubuntu 22.04 or higher are recommended)
- You need super user privileges (either root access or the right to use sudo)
- The above tools should be installed (Docker, Kubernetes, Kubectl, Minikube, Helm and Browser, X-Environment)

### Access to the Internet

Most companies run a complex network. Usually direct open access to the Internet is not allowed. Firewalls and proxy server isolate the local network and most communication links are blocked (by blocking ports and external URLs).

Before you start configuring your environment ensure that you know your

- network addresses
- routes (and router) as well as gateways
- proxy server

You may need the support of your local IT department. Once you are confident to understand the network layout you can start to configure (or ask to configure) the access to required resources (repositories) for the installation process. For the implemented installation process as configured you will need access to a couple of URLs for different repositories:

### URL Whitelist

#### Specific URLs​, required for [MXD]

```bash
.download.docker.com​
.k8s.io​                                             # Kubectl
.io/v2​
.charts.bitnami.com​
.download.docker.com/linux/ubuntu/gpg​
.storage.googleapis.com​                             # Minikube
.hub.docker.com                                     # Docker Hub​
.kubernetes.io                                      # Kubernetes​
.helm.sh                                            # Helm Charts​
.hashicorp.com​
.github.io​
.apt.releases.hashicorp.com
```

#### General URLs​, may be used for further components of the EDC

```bash
.access.redhat.com/solutions/15840                  # yum​
.apps.fedoraproject.org/packages                    # dnf​
.software.opensuse.org                              # zypper​
.snapcraft.io                                       # snap​
.pypi.org                                           # pip​
.packagist.org                                      # composer​
.deb.debian.org                                     # Debian Package Updates​
.mirrors.centos.org                                 # CentOS Package #Updates​
.mirrors.fedoraproject.org                          # Fedora Package Updates​
.download.opensuse.org                              # openSUSE Package Updates​
.packages.debian.org                                # Debian Package Repositories​
.archlinux.org                                      # Arch Linux Package Repositories​
.packages.gentoo.org                                # Gentoo Package Repositories​
.pkgs.org                                           # RHEL/CentOS Package Repositories​
.kernel.org                                         # Linux Kernel Updates​
.git.kernel.org/pub/scm/linux/kernel/git/firmware/linux-firmware.git. # Linux Firmware Updates​
.sourceforge.net                                    # SourceForge​
.npmjs.com                                          # Node Package Manager (NPM)​
.rubygems.org                                       # RubyGems​
.ubuntu.com                                         # Ubuntu Package Updates​
.github.com​
.raw.githubusercontent.com​
```

:::note

The above list is currently a candidate for changes, especially as long as the used installations scripts and tools are still in development.

:::

### Ports

#### https (443)

You will need https (port 443) as open port for getting access to the above repositories. If you do not have direct access from your system, you most likely work in an environment which is using proxy forwarding for https. An easy way to configure your system to use the proxy server is by setting the envionment variabale "https_proxy". For example with the command below (bash), if the port 8080 is used for the forwarding:

```bash
export https_proxy=http://[proxy-web-or-IP-address]:8080
```

The complete format is:

```bash
export https_proxy=http://[username]:[password]@ [proxy-web-or-IP-address]:[port-number]
```

:::tip

The above URLs then will be passed only if your proxy server is configured to forward the above whitelist of URLs. To ensure your setting is permant, you may want to add the above command in your .bashrc or /etc/environment. Further you can configure apt to use the proxy by entering the following into the configuration file /etc/apt/apt.conf:

```bash
Acquire::https::Proxy "http://[username]:[password]@ [proxy-web-or-IP-address]:[port-number]";
```

To ensure, that the local access is not forwarded, you should set NO_PROXY as environment variable or in your .bashrc or in /etc/environment.

```bash
export NO_PROXY="localhost,127.0.0.1,::1"
```

:::

#### http (80)

The port http (80) will not be used in production, but for the tutorial it will, avoiding a more complex setup with SSL. You can apply the above hints for https (port 443) just by replacing https by http.

#### ssh (22)

For the [MXD], which is running locally, you only need secure shell access, which means port 22 should be open.

#### Further ports

Opening further ports is not required for the tutorial, as the setup is designed to work within a cluster. Once you want to modify the setup, allowing EDCs and services to communicate between different locations, you need to open additional ports and use ingress for port mapping. (This will be described in a later version)

### Install the basic tools (on Ubuntu 22.x and higher)

Within this section we briefly describe how to install the required tools on an Ubuntu system. We have tested this on 22.04.3 LTS (GNU/Linux 5.15.0-86-generic x86_64). Please check the online availabe documentation for further details.

#### Install docker

```bash
sudo apt update && sudo apt upgrade
```

```bash
sudo apt install docker.io
```

#### Install kubernetes

```bash
sudo apt update && sudo apt upgrade
```

```bash
sudo apt install kubernetes
```

#### Install kubectl

```bash
sudo snap install kubectl --classic
```

Occasionally snap will fail with an error message "Access forbidden", alternativly you may try to install Kubectl using the native pakage as follows. Please check <https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/> for further information.

```bash
sudo apt-get update
# apt-transport-https may be a dummy package; if so, you can skip that package
sudo apt-get install -y apt-transport-https ca-certificates curl
```

Download the public signing key for the Kubernetes package repositories. The same signing key is used for all repositories so you can disregard the version in the URL

:::note

In Ubuntu 22.04, folder /etc/apt/keyrings does not exist by default, and it should be created before the curl command. If the folder `/etc/apt/keyrings` does not exist, it should be created before the curl command.

```bash
sudo mkdir -p -m 755 /etc/apt/keyrings
```

:::

Now use the curl command to download the release keys.

```bash
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.30/deb/Release.key | \
sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
```

To allow unprivileged APT programs to read this keyring also change the file permissions.

```bash
sudo chmod 644 /etc/apt/keyrings/kubernetes-apt-keyring.gpg
```

Add the appropriate Kubernetes apt repository. If you want to use Kubernetes version different than v1.30, replace v1.30 with the desired minor version in the command below:

```bash
# This overwrites any existing configuration in /etc/apt/sources.list.d/kubernetes.list
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.30/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo chmod 644 /etc/apt/sources.list.d/kubernetes.list   # helps tools such as command-not-found to work correctly
```

Update apt package index, then install kubectl:

```bash
sudo apt-get update
sudo apt-get install -y kubectl
```

::: Note
To upgrade kubectl to another minor release, you'll need to bump the version in /etc/apt/sources.list.d/kubernetes.list before running apt-get update and apt-get upgrade.
:::

Check that kubectl is properly configured by getting the cluster state:

```bash
kubectl cluster-info
```

#### Install Minkube

To install minikube just download the executable from the reposotory. (Please check also <https://kubernetes.io/de/docs/tasks/tools/install-minikube/>)

```bash
curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 \
&& chmod +x minikube
```

#### Install helm

helm will be installed with snap.

::: note

This revision of snap "helm" is published using classic confinement and thus may perform
arbitrary system changes outside of the security sandbox that snaps are usually confined to.

:::

```bash
sudo snap install helm --classic
```

#### X-Environment and Webbrowser

:::note

If not already installed, install xterm and a webbroser like firefox or google-chrome, you also may need to install an x-environment (xterm).

:::

Install xterm with apt.

```bash
sudo apt install xterm
```

Check if you can access your system by using

```bash
ssh -X <your system>
```

To enusre that the X11forwaring is working for ssh -X, add to your .bashrc

```bash
# ensure google-chrome and other garphic apps find the X-Authorisation file
export XAUTHORITY=$HOME/.Xauthority
```

and in /etc/ssh/sshd_config set the following variables to yes.

```bash
X11Forwarding yes
X11UseLocalhost yes
```

Then you should be able to run xterm and the webrowser locally to open the links given later in the tutorial.

If you want to install google-chrome, do as follows, you may use any other Browser. Download the latest Google Chrome Debian package via the following command:

```bash
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
```

Install the package

```bash
sudo dpkg -i google-chrome-stable_current_amd64.deb
```

 In the event you encounter any dependency issues, resolve them using

```bash
sudo apt-get install -f
```

#### Install insomnia

If you want a powerful API client that simplifies the process of building, debugging, and testing APIs, you may want to install Insomnia. (An other alternativ ist Postmann). However for the tutorial we currently do not need an API client, as we will use curl. But if you want you can just install Insomnia as follows:

```bash
sudo apt-get update
sudo apt-get install insomnia
```

:::info

Your enviroment for the tutorial starting with chapter "deploy" should be ready.

:::

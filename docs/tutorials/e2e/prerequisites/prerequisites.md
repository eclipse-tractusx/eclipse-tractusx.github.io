---
title: Prerequisites
sidebar_position: 1
---

## Preface

The components and tools that are described here are to be understood as a proposal and not as standard that must be used. Using the proposed software stack of this tutorial will make it easier to complete it. Nevertheless, if your company policy requires e.g. the use of open stack, or you can't use docker containers or kubernetes, the Catena-X components will also work, you might just need a little extra effort.

:::info

You can either complete the tutorial in a cloud space (e.g. AWS or Azure) or locally. If you choose to run the tutorial locally, make sure that your machine fullfils the minimal performance requirements.

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

## Preparing your own environment on local systems

In case you want to install Tractus-X components or [Kits] directly on your local system you need the following:

- Access to the internet (see next section)
- One local server instance, either a physical server or a virtual machine with at least 4 CPUs, 10 GB [RAM] and 20 GB storage
- Your local system should run a Linux Version (Debian or Ubuntu 22.04 or higher are recommended)
- You need super user privileges (either root access or the right to use sudo)
- The above tools should be installed (Docker, Kubernetes, Kubectl, Minikube, Helm and Browser, X-Environment)
- To enable users to run the tutorial after you have installed the required environment setup the environment as described in the last section.

### Access to the Internet

Most companies run a complex network. Usually direct open access to the Internet is not allowed. Firewalls and proxy server isolate the local network and most communication links are blocked (by blocking ports and external URLs).

Before you start configuring your environment ensure that you know your

- network addresses
- routes (and router) as well as gateways
- proxy server

You may need the support of your local IT department. Once you are confident to understand the network layout you can start to configure (or ask to configure) the access to required resources (repositories) for the installation process. For the implemented installation process as configured you will need access to a couple of URLs for different repositories:

### URL Whitelist

#### Specific URLs​, required for [TXD]

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

You will need https (port 443) as open port for getting access to the above repositories. If you do not have direct access from your system, you most likely work in an environment which is using proxy forwarding for https. An easy way to configure your system to use the proxy server is by setting the environment variable "https_proxy". For example with the command below (bash), if the port 8080 is used for the forwarding:

```bash
export https_proxy=http://[proxy-web-or-IP-address]:8080
```

The complete format is:

```bash
export https_proxy=http://[username]:[password]@ [proxy-web-or-IP-address]:[port-number]
```

:::tip

The above URLs then will be passed only if your proxy server is configured to forward the above whitelist of URLs. To ensure your setting is persisted, you may want to add the above command in your .bashrc or /etc/environment. Further you can configure apt to use the proxy by entering the following into the configuration file /etc/apt/apt.conf:

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

For the [TXD], which is running locally, you only need secure shell access, which means port 22 should be open.

#### Further ports

Opening further ports is not required for the tutorial, as the setup is designed to work within a cluster. Once you want to modify the setup, allowing EDCs and services to communicate between different locations, you need to open additional ports and use ingress for port mapping. (This will be described in a later version)

### Install the basic tools (on Ubuntu 22.x and higher)

Within this section we briefly describe how to install the required tools on an Ubuntu system. We have tested this on 22.04.3 LTS (GNU/Linux 5.15.0-86-generic x86_64). Please check the online available documentation for further details.

#### Install docker

Ensure that you are up to date with your release (for Ubuntu we use atp, which needs to run with root privileges):

```bash
sudo apt update && sudo apt upgrade
```

Now install docker ...

```bash
sudo apt install docker.io
```

:::note

The user group docker should be created, check if it exists.

```bash
grep docker /etc/group
```

Response should be:

```bash
docker:x:120:
```

You need the user group later, to assign your user.

:::

#### Install kubernetes

As before, ensure you have the latest versions for your release.

```bash
sudo apt update && sudo apt upgrade
```

and the install kubernetes

```bash
sudo apt install kubernetes
```

#### Install kubectl

kubectl will be installed with snap, we need to use snap security policy "classic" instead of the default policy "strict" to allow snap full access to the system.

```bash
sudo snap install kubectl --classic
```

:::note

Occasionally snap will fail with an error message "Access forbidden", alternatively you may try to install Kubectl using the native package as follows. Please check <https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/> for further information.

:::

Now we install a fake transitory package. This APT transport supports access to repositories through the HTTP Secure protocol (HTTPS), often known as HTTP over TLS. It is important to note that transport is never called directly by a user but is instead used by APT tools based on user settings. That's exactly what we are going in the following steps:

```bash
sudo apt-get update
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

Check that kubectl is properly configured by getting the cluster state:

```bash
kubectl cluster-info
```

#### Install Minikube

To install minikube just download the executable from the repository. (Please check also <https://kubernetes.io/de/docs/tasks/tools/install-minikube/>)

```bash
curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 \
&& chmod +x minikube
```

The chmod command is used to ensure minikube is executable. If you want other users to have access, you should copy the executable to /usr/bin/ or another comparable location which is used by all users. Ensure that all members of the group "docker" have access.

```bash
sudo cp ./minikube /usr/bin
chgrp docker /usr/bin/minikube
chmod 750 /usr/bin/minikube
```

#### Install helm

We will need Umbrella Helm Charts for the deployment of the tutorial Catena-X environment, teh required tool helm will be installed with snap.

:::note

This revision of snap "helm" is published using classic confinement and thus may perform
arbitrary system changes outside of the security sandbox that snaps are usually confined to.

:::

```bash
sudo snap install helm --classic
```

#### X-Environment and Webbrowser

:::note

If not already installed, install a X11 environment (xterm) and a web browser  like firefox or google-chrome.

:::

To install and configure the X11 environment use apt.

```bash
sudo apt install xterm
```

Ensure that the X11 forwarding is working for ssh -X, add to your .bashrc

```bash
# ensure google-chrome and other graphic apps find the X-Authorisation file
export XAUTHORITY=$HOME/.Xauthority
```

and in /etc/ssh/sshd_config set the following variables to yes.

```bash
X11Forwarding yes
X11UseLocalhost yes
```

Check if you can access your system by using for a remote location (or you may also use your system, but do not use localhost as system name)

```bash
ssh -X <your username>@<your systemname>
```

after having logged in enter

```bash
xterm &
```

and a new window should appear on your screen. If not ensure that you system is enabled to serve as X server. You may also need to investigate how the environment variable DISPLAY is set.

Then you should be able to run xterm and the web browser locally to open the links given later in the tutorial.

If you want to install google-chrome, do as follows, you may use any other browser. We prefer google-chrome as it works easier in the combination of using ssh with X forwarding. Download the latest Google Chrome Debian package via the following command:

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

If you want a powerful API client that simplifies the process of building, debugging, and testing APIs, you may want to install Insomnia. (Another alternative is Postmann). However for the tutorial we currently do not need an API client, as we will use curl. But if you want you can just install Insomnia as follows:

```bash
sudo apt-get update
sudo apt-get install insomnia
```

### Setup a user environment for running the tutorial with a minimum set of privileges

You do not need full system access to proceed with the following steps of tutorial (even not for the deployment). Further you may allow several users to deploy their environment at the same time on the same system. But there are a few critical aspects, you need to consider. But first we begin with setting up the appropriate permissions for a user.

:::note

We use as example the username [tx01].

:::

The user tx01 needs the following permissions to be able to successfully complete the tutorial.

- if has to be a member of the group docker.
- He needs write access to /etc/hosts
So we run the following commands, assuming the user already exists:

```bash
sudo addusr tx01 docker               # adds the user to the group docker
sudo chgrp docker /etc/hosts          # change the group permission from root to docker
sudo chmod 664 /etc/hosts             # This allow now our user tx01 to edit /etc/hosts
```

You should brief your user regarding their responsibility when they are editing /etc/hosts.

:::warning

Users like tx01 with the above permissions can start minikube clusters, which will bring up kubernetes and Umbrella helm charts. By sharing the permission via the group docker, they are also able to disturb clusters and services of another user within the same group docker. Therefore, it is important that they choose individual names for their minikube profiles and Umbrella namespaces. Further they should avoid any option like "--all". See also additional hints in the next chapter "deploy".

:::

:::info

Your environment for the tutorial starting with chapter "deploy" should be ready.

:::

---
title: Prerequisites
sidebar_position: 1
---


## Preface

The components and tools that are described here are to be understood as a proposal from Tractus-X and not as standards that must be used. Using the proposed software stack of this tutorial will make it easier to complete it. Nevertheless, if your company policy requires e.g. the use of open stack, or you can't use docker containers or kubernetes, the Catena-X components will also work, you might just need a little extra effort.

:::info

You can either complete the tutorial in a cloud space (e.g. AWS or Azure) or locally. If you choose to run the tutorial locally, make sure that your machine fulfils the minimal performance requirements.

:::

## Required Skills and Technologies

As mentioned in the introduction, no preliminary knowledge about Catena-X is required. However, to complete the tutorial you will have to work with the following technical software stack. A basic understanding of those technologies is advised.

- Cloud Environment (AWS/Azure) or a local machine with at least 16GB RAM, 20GB free storage
- Docker
- Kubernetes
- Kind (for local systems)
- Helm (will be installed by Terraform)
- Terraform


## Chosing your environment

The tutorial is designed to be used in cloud environments, such as AWS, Google or Azure. If you intendend to build your own local environment independly from Cloud based offers, you may use ths tutorial as well, but you need to ensure, you have the rigth technical software stack installed, see below. 

## Setting up your own environment on local systems

In case you want to install Catena-X components or Kits directly on your local system you need the following:

- Access to the internet (see next section)
- One local server instance, either a physical server or a virtual machine with at least 2 CPUs 16 GB menory and 20 GB storage
- Your local system should run a Linux Version (Debian or Ubuntu are recommended)
- You need super user privileges (either root access or the right to use sudo)
- The above tools should be installed (Docker, Kubernetes, Kind, Helm, Terraform)

### Access to the Internet

Most companies run are more complex network, usually direct open access to the Internet is not allowed. Firewalls and proxy server isolate the local network and most communication links are blocked (by blocking ports and external URLs).

Before you start configuring your environment ensure that you know your

- network addresses
- routes (and router) as well as gateways
- proxy server

You may need the support of your local IT department. Once you are confident to understand the network layout you can start to configure (or ask to configure) the access to required resources (repositories) for the installation process. For the implemented installation process as configured you will need access to a couple of URLs for different repositories: 

### URL Whitelist

	# Specific URLs​, required for MxD

 	.download.docker.com​
 	.k8s.io​
 	.io/v2​
	.charts.bitnami.com​
	.download.docker.com/linux/ubuntu/gpg​
 	.storage.googleapis.com​
 	.hub.docker.com                                     # Docker Hub​
  	.kind.sigs.k8s.io				    # Kind
 	.kubernetes.io                                      # Kubernetes​
 	.helm.sh                                            # Helm Charts​
 	.hashicorp.com​
 	.github.io​
	 apt.releases.hashicorp.com
	
 	#General URLs​, may be used for further components of the EDC

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
 	.git.kernel.org/pub/scm/linux/kernel/git/firmware/linux-firmware.git    # Linux Firmware Updates​
 	.sourceforge.net                                    # SourceForge​
 	.npmjs.com                                          # Node Package Manager (NPM)​
 	.rubygems.org                                       # RubyGems​
 	.ubuntu.com                                         # Ubuntu Package Updates​
 	.github.com​
 	.raw.githubusercontent.com​

Please note, that the above list is currently a candidate for changes, especially as long as the used installions scripts and tools are still in development.

### Ports

#### https (443)

You will need https (port 443) as open port for getting access to the above repositories. If you do not have direct access from your system, you most likely work in an environment wich is using proxy forwarding for https. An easy way to configure your system to use the proxy server is by setting the envionment variabale "https_proxy". For example with the command below (bash), if the port 8080 is used for the forwarding:
  	
	export https_proxy=http://arena2036-proxy.rus.uni-stuttgart.de:8080

The above URLs then will be passed only if your proxy server is configured to forward the above whitelist of URLs. 

#### ssh (22)

For the MxD, which is running locally, you only need secure shell access, which means port 22 should be open.


### Install the basic tools (on Ubuntu 20.x and higher)
Within this section we briefly describe how to install the required tools on an Ubuntu system. We have tested this on 22.04.3 LTS (GNU/Linux 5.15.0-86-generic x86_64). Please check the online availabe documentation for further details.

1.) Install docker:
	
	sudo apt install docker.io

2.) Install kubernetes:
	
 	sudo apt install kubernetes

3.) Install kubectl:  
	
	sudo snap install --classic kubectl
	
4.) Install Kind:  
    a. Install go:   
	
  	sudo apt install golang-go
  
   b. Install kind:
	
	sudo go install sigs.k8s.io/kind@v0.20.0
	
   c. Check go version:                                  
	
 	go version
  	
   Response should be: "go version go1.18.1 linux/amd64"

5.) Terraform

Prepare the installation of Terraform including helm: 
	
 	sudo apt-get update && sudo apt-get install -y gnupg software-properties-common
	sudo wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
 	
Verify the generated key is working:
	
 	gpg --no-default-keyring \
	--keyring /usr/share/keyrings/hashicorp-archive-keyring.gpg \
	--fingerprint
	echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
	https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list

Now install Terraform, which automatically also will install helm.
	
 	sudo apt-get install terraform
	

6.)  If not already installed, install a webbroser like firefox or goggle-chrome, you also may need to install an x-environment (xterm). Check if you can access your system by using

 	ssh -X <your system>

Then you should be able to run the webrowser locally to open the links given later in the tutorial.


## You should be ready

Your enviroment for the tutorial starting with chapter "deploy" should be ready. 

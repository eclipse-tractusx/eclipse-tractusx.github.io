---
title: Deploy components
sidebar_position: 2
---

The [TXD] dataspace initially consists of several components: `Alice` and `Bob` (two Tractus-X EDC connectors),
a Vault instance each, a Postgres database, a Managed Identity Wallet app, a Keycloak instance. `Alice` and `Bob` will
be our dataspace participants. Each of them stores their secrets in their respective vault instances, and there is a
shared Postgres server, where each of them has a database. MIW and Keycloak are central components, they only exist
once and are accessible by all participants.

:::note
This chapter refers to also to the README for the Tractus-X umbrella charts following the link:  
<https://github.com/eclipse-tractusx/tractus-x-umbrella/blob/main/charts/umbrella/README.md>
:::

:::Warning
If you are [not] the only user on your system working with the turorial, means you are working in a multi-user environment, please ensure, that you understand your impact on other minikube profiles of other users and Umbralla namespaces. Please check, if other user are working on the same system by checking the existance of other minikube profiles with the command:

```bash
minkube profile list
```

Please ensure you are using a different profile name f and[never] using options like **--all**. To avoid disturbing other we use the environment varaible [$USER] any time whne we specify a name for a minkube profile of an Umbrella namespace.

So if your minikube cluster will not be the only one running in your system, please

- use specific names for your cluster profile and namespaces for helm​

  - Proposed name for the cluster profile: **minikube-$USER**
  - Proposed name for the umbrella namespace: **umbrella-$USER** ​

- Ensure you are using the option **-p**, everytime you calling minikube ​

```bash
minikube –p minikube-$USER <command> <options>                             ​
```

Ensure you are using the option **–n**, everytime you calling helm​

```bash
helm <command> <options> –n umbrella-$USER                              ​
```

Before you enable ingress enter:​

```bash
minikube profile minikube-$USER​
```

This will ensure that ingress is working in the correct environment of your cluster profile.

:::

## Using Umbrella Helm Charts for the Deployment
This Tutorial will be deployed by using an umbrella chart, which provides a basis for running end-to-end tests or creating a sandbox environment of the Catena-X automotive dataspace network consisting of Tractus-X OSS components. The Chart aims for a completely automated setup of a fully functional network, that does not require manual setup steps, as long as only one instance (minikube cluster) is running, see above warning). If several clusters are riunninh we need to adjsut a few configartion files.

The currently available components availbe by the Umbrella Helm Chart are following:
- portal
- centralidp
- sharedidp
- bpndiscovery
- discoveryfinder
- sdfactory
- managed-identity-wallet
- semantic-hub
- dataconsumerOne (tractusx-edc, vault)
- tx-data-provider (tractusx-edc, digital-twin-registry, vault, simple-data-backend)
- dataconsumerTwo (tractusx-edc, vault)

### Starting with the Deployment of [TXD] , our own local dataspace

We now start to deploy the TXD, our own dataspace. We will start by downloading the sources from Github into our local environment. Then we will step by step
- get the source
- start minikube bringing up the cluster (profile)
- enabling Ingress for local access using the addon for Minikube
- adjusting the configurationb files for the Umbrella Helm Chart (this is not required, if you are the only user on a system)
- bringing uo the certifacation manager
- Using helm to install our first dataprovider and consumer EDCs
- checking their liveness

### Get the source from the Tractus-X Github
For the most bare-bones installation of the dataspace, execute the following commands in a shell:

```bash
# get the tutorial including the config file for the cluster by cloning the repository locally
git clone  [https://github.com/eclipse-tractusx/tutorial-resources.git](https://github.com/eclipse-tractusx/tractus-x-umbrella.git")
```

We now will find under your current working directory the directory [tractus-x-umbrella], change into this drectory:

```bash
cd tractus-x-umbrella
```

### Start the minkube cluster (profile)
To start the cluster we just call **minikube start**, if we have morethen one instance, we use -p option to set the profile name minikube-$USER, we use the othe roptions to request the appropiate resources.

```bash
minikube start [-p minikube-$USER] --cpus=4 --memory 6gb   # Start the cluster, if -p option is used with the profile name minikube-$USER
```

We now switch the context to minikube profile, this is required to ensure Ingress get the correct data of the cluster, but it is not needed, if you run only one minikube cluster on your system.

```bash
minikube profile minikube-$USER                           # Switch the context to minikube profile
```

You can check you minikube cluster any time by starting the Minkube dashboard:

```bash
minikube [-p minikube-$USER] dashboard                   # if -p option is used, with the profile name minikube-$USER
```

### Seting up the local internal netwok
in order to enable the local access via ingress, use the according addon for Minikube:

```bash
minikube [-p minikube-$USER] addons enable ingress                 # if -p option is used, with the profile name minikube-$USER
```

You will be fine by just enabling ingress, if you now add a few hostnames into  /etc/hosts. You shoul densure that you have access, the /etc/hosts file group entry should be assigend to the group **docker**. check with 

```bash
ls -al /etc/hosts                  # Output should be like:  "-rw-r--r-- 1 root docker 414 Jun 16 14:34 /etc/hosts"
```

Alternatively confugire the DNS Service to be enabled for Ingress.

:::note

 Ths requires that you have an DNS on your system running and that you have **root accees** via **sudo**

:::

```bash
minikube [-p minikube-$USER] addons enable ingress-dns                # if -p option is used, with the profile name minikube-$USER
```

Find out the IP  Address of your minikube clsuter by entering:

```bash
minikube [-p minikube-$USER] ip                                       # if -p option is used, with the profile name minikube-$USER
```

This return your IP Address which you now use as follows:

Update the file /etc/resolvconf/resolv.conf.d/base to have the following contents.

```bash
search test
nameserver 192.168.99.169
timeout 5
```
::note

Replace 192.168.99.169 with the output of minikube ip. If you are not the only one running the tutorial on your system replace **tx**with your username stored in **$USER**. 

:::

 Then run the following commands:

```bash
sudo resolvconf -u
systemctl disable --now resolvconf.service
```

Check if the dns reasolving is working by requesting the IP addresses for the differnt service

```bash
nslookup centralidp.tx.test
nslookup dataconsumer-1-dataplane.tx.test
nslookup dataprovider-dataplane.tx.test
```

They should all return the saem IP adresse (the one of Minikube [-p minikube.$USER ip ]. If you face issues in resolving the address, add the following hosts entries into your /etc/hosts file, and replace the IP address with your value and **tx** by your choosen name:

```bash
192.168.49.2    centralidp.tx.test
192.168.49.2    sharedidp.tx.test
192.168.49.2    portal.tx.test
192.168.49.2    portal-backend.tx.test
192.168.49.2    managed-identity-wallets.tx.test
192.168.49.2    semantics.tx.test
192.168.49.2    sdfactory.tx.test
192.168.49.2    dataconsumer-1-dataplane.tx.test
192.168.49.2    dataconsumer-1-controlplane.tx.test
192.168.49.2    dataprovider-dataplane.tx.test
192.168.49.2    dataconsumer-2-dataplane.tx.test
192.168.49.2    dataconsumer-2-controlplane.tx.test
```

### Install the first setup

:::Note
Understanding the role of helm install and upgrade

helm install is used to install a chart in Kubernetes using Helm.
  
  --set COMPONENT_1.enabled=true,COMPONENT_2.enabled=true Enables the components by setting their respective enabled values to true.

  **umbrella** is the release name for the chart.

  tractusx-dev/umbrella specifies the chart to install, with tractusx-dev being the repository name and umbrella being the chart name.

  --namespace umbrella specifies the namespace in which to install the chart.

  --create-namespace create a namespace with the name umbrella

**If we have more than one instance of the minikube clusters running, we also should modfiy the namespace [umbrella] to [umbrella-$USER]** 

:::

We start with ensuring that we are using the released charts.

```bash
helm repo add tractusx-dev https://eclipse-tractusx.github.io/charts/dev
```

For the tutorial we first select a subset of components for the dataexchange between a dataconsumer (Alice) and a dataprovider (Bob). The needed components are the following:
- centralidp
- managed-identity-wallet
- dataconsumerOne (tractusx-edc, vault)
 -tx-data-provider (tractusx-edc, digital-twin-registry, vault, simple-data-backend)

### Using a preconfigured configraution file [values-adopter-data-exchange.yaml]

We chosing a predefined subset of the E2E adopter journey which provies the above selecteion.

:::Note

skip the next paragraph, if you are running the only one minikube cluster on your system

:::

#### Adjusting the Config files for multi user usage 
In case we have to modify the values within the configuartion files as we run in a multi use enviromnet, we need adjust the domians names within the configuration files.A simple way is to update the file by using **sed** as line editor.

```bash
# adjust values.yaml
#
DOMAIN_NAME="$USER.test"
CONFIG_FILE="alues-adopter-data-exchange.yaml"
cp values.yaml values.yaml.orig
cat values.yaml.orig | sed s/tx.test/$DOMAIN_NAME/ > values.yaml
echo "file values.yaml updated with actual dommainame $DOMAIN_NAME"
cp $CONFIG_FILE $CONFIG_FILE.orig
cat $CONFIG_FILE.orig | sed s/tx.test/$DOMAIN_NAME/ > $CONFIG_FILE
echo "file $CONFIG_FILE updated with actual dommainame $DOMAIN_NAME"
# Adjust further files: concept/seeds-overall-data.md, init-container/iam/centralidp/CX-Central-realm.json, init
-container/iam/sharedidp/CX-operator-realm.json. init-container/iam/sharedidp/CX-operator-users-0.json
#
cd ../..
echo "Modifing file concept/seeds-overall-data.md, ..."
cp concept/seeds-overall-data.md concept/seeds-overall-data.md.orig
cat concept/seeds-overall-data.md.orig | sed s/tx.test/$DOMAIN_NAME/ > concept/seeds-overall-data.md
echo "Modifing file  init-container/iam/centralidp/CX-Central-realm.json ..."
cp init-container/iam/centralidp/CX-Central-realm.json init-container/iam/centralidp/CX-Central-realm.json.orig
cat init-container/iam/centralidp/CX-Central-realm.json.orig | sed s/tx.test/$DOMAIN_NAME/ > init-container/iam/centralidp/CX-Central-realm.json
echo "Modifing file init-container/iam/sharedidp/CX-operator-realm.json ..."
cp init-container/iam/sharedidp/CX-Operator-realm.json init-container/iam/sharedidp/CX-Operator-realm.json.orig
cat init-container/iam/sharedidp/CX-Operator-realm.json.orig | sed s/tx.test/$DOMAIN_NAME/ > init-container/iam/sharedidp/CX-Operator-realm.json
echo "Modifing file init-container/iam/sharedidp/CX-operator-realm.json ..."
cp init-container/iam/sharedidp/CX-Operator-users-0.json init-container/iam/sharedidp/CX-Operator-users-0.json.orig
cat init-container/iam/sharedidp/CX-Operator-users-0.json.orig | sed s/tx.test/$DOMAIN_NAME/ > init-container/iam/sharedidp/CX-Operator-users-0.json
```



#### Run the helm install command to install the cert-manager chart in the same namespace where the umbrella chart will be located." 

```bash
helm install cert-manager jetstack/cert-manager --namespace umbrella[-$USER] --create-namespace --version v1.14.4 --se
t installCRDs=true
```

Configure the self-signed certificate and issuer to be used by the ingress resources

```bash
cat <<EOF > kubectl-apply-in
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: selfsigned-issuer
spec:
  selfSigned: {}
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: my-selfsigned-ca
  namespace: $NAMESPACE
spec:
  isCA: true
  commonName: $DOMAIN_NAME
  secretName: root-secret
  privateKey:
    algorithm: RSA
    size: 2048
  issuerRef:
    name: selfsigned-issuer
    kind: ClusterIssuer
    group: cert-manager.io
  subject:
    organizations:
      - CX
    countries:
      - DE
    provinces:
      - Some-State
---
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: my-ca-issuer
spec:
  ca:
    secretName: root-secret
EOF

kubectl apply -f kubectl-apply-in

```

#### Now we install the perdefiend setup for our tutorial

Getting dependencies from Repo ...

```bash
helm dependency update
```

Installing the Tutorial chart as part of th E2E journey.

```bash
helm install -f values-adopter-data-exchange.yaml umbrella . --namespace umbrella[-$USER] --create-namespace
```



## Inspect 

After the `helm` command has successfully completed, it will output a few configuration and setup values
that we will need in later steps. Please note that some values will be different on your local system.

Checking liveness of dataprovider ...

```bash
curl -X GET http://dataprovider-controlplane.$DOMAIN_NAME/api/check/liveness | jq
```

Checking liveness of dataconsumer ...

```bash
curl -X GET http://dataconsumer-1-controlplane.$DOMAIN_NAME/api/check/liveness | jq
```

## Inspect the databases

Please be aware, that all services and applications that were deployed in the previous step, are **not** accessible from
outside the Kubernetes cluster. That means, for example, the Postgres database cannot be reached out-of-the-box.

As mnentioned above you can use the minikube dashboard to inspect your cluster:

```bash
minikube [-p minikube-$USER] dashboard                   # if -p option is used, with the profile name minikube-$USER
```

:::Note
This chapter refers to a subset of the E2E Journey describes in the README for the Tractus-X umbrella charts. Please follow the link:  <https://github.com/eclipse-tractusx/tractus-x-umbrella/blob/main/charts/umbrella/README.md>. There you will find a lot more information on how you can extend the setup bay adding furterh components, such as a poirtal to increase your experince. You also find hints how to use the Umbrella Helm Chart on Window or MAC. We will continue to add more content to the tutorial. 
:::

## Notice

This work is licensed under the [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/legalcode).

- SPDX-License-Identifier: CC-BY-4.0
- SPDX-FileCopyrightText: 2023 sovity GmbH
- SPDX-FileCopyrightText: 2023 SAP SE
- SPDX-FileCopyrightText: 2023 msg systems AG
- Source URL: [https://github.com/eclipse-tractusx/eclipse-tractusx.github.io](https://github.com/eclipse-tractusx/eclipse-tractusx.github.io)

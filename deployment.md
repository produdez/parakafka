# Deployment Steps

## Kafka machine

### OS Note

1. Os version ` cat /etc/os-release`
    - Os is "CentOS Linux"
    - Version 7
2. Package Installer
    - base package installer is `yum`

## Installations

### Updating yum
```
yum update -y
```

### Git
```
sudo yum -y install https://packages.endpoint.com/rhel/7/os/x86_64/endpoint-repo-1.9-1.x86_64.rpm

sudo yum install git
```
- Git version: `2.30.1`
- Ref: [link](https://computingforgeeks.com/how-to-install-latest-version-of-git-git-2-x-on-centos-7/)


### Install docker

- dependencies
```
sudo yum install -y yum-utils
```
- add repo
```
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```
- Install engine
```
sudo yum install docker-ce docker-ce-cli containerd.io
```
- Start docker
```
sudo systemctl start docker
```
- Verify docker started

```
 sudo docker run hello-world
```

### Docker-Compose
- Download
  ```
  sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  ```
- Add permission
```
sudo chmod +x /usr/local/bin/docker-compose
```
## How to Clone git repo
- Note: cant do this through `ssh` since git version is low (i think)
- So we need to do it through `personal access token`
- ref: [link](https://github.community/t/clone-private-repo/1371/2)

1. Generate a personal access token
[LINK](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
2. Clone using username, token and repo link
3. Example:
- If github link is: `https://github.com/produdez`
- Then user name is `produdez`

```
git clone https://github.com/strafe/project.git
```
- Enter username and password (token) when git asks
```
...
<enter username>
<enter pass (token)>
```

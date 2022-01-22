# Context

The context of a development environment.  Tooling and packages are focused on the following:

* Debian
* NodeJS
* Python
* UI / Headless browsing

The purpose of this context is to separate development packages and executions from the host machine.  This helps save against potential folder/file and memory or CPU issues when executing developing code.  It also attempts to prevent changes to the host system from adversely impacting the development dependencies.

The docker image mounts a local project folder, as described below.  This keeps the docker image smaller and more responsive than importing the data each time a change is made.  However, it can cause some problems with private git repositories.  It can sometimes experience potential file access issues (rarely seen when running `npm install`).  Solutions for these experiences can be either to execute `npm install` commands from the host (thus another reason for mounting project folder to /repo) or copying ssh keys to /root/.ssh for internal use.

## Setup

### Matching Manual Values

* The string in package.json for "docker" property must match the naming convention for the primary service in docker-compose.yml
* A relevant folder must exist which matches the volume configured in docker-compose.yml. See `Folder Setup` below

### Folder Setup

Modify the `[]` places described in the Docker section below.  The services.`[]` should match the image name you want.  The ./`[]`:/repo should match your project folder, it will be mounted inside the Docker container at the root `/repo` folder.

Might need to run the PATH related command below, from the Errors section.


### Creation

Otherwise, run `npm run initialize` to install node packages/dependencies and build Docker image.  Press CTRL-C when finished to exit the docker container.  This command includes a `launch` portion which is necessary after building the container to properly set it up ready for a `start` command.

## Usage

Once built, the main commands are:

* `npm run start` to run the Docker container
* `npm run access` to drop into the Docker's terminal at the /repo folder

This will put you in the containers root `/repo` folder which is mounted to your project's folder (specified in `docker-compose.yml`).

## Docker

Update the following

* package.json .docker
* docker-compose.yml services.`[]`
* docker-compose.yml services.`[]`.image
* docker-compose.yml services.`[]`.volumes ./`[]`:/repo

### Nodemon

Only necessary if building node apps and want it to automatically reload

```nodejs
npm install nodemon -g
nodemon app.js
```

### Port Forwarding

Only necessary if utilizing web browser or other web services traffic between host and/or docker services.

Normally

* services.`[]`.ports - "5501:5501"

However, WSL2

* If run a server.js on port 5501
  * `http://[::1]:5501/`
* in WSL: `sudo sysctl -w net.ipv6.conf.all.forwarding=1`
  * `localhost:5501`


## SSH & GitHub

<https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/testing-your-ssh-connection>

```shell
eval $(ssh-agent -s)
ssh -T git@github.com
```

There are some references to `SSH` commands and environment variables in the `docker-compose.yml` and `./bin` contents.  These were (failed) attempts to pass through SSH information from the host machine into the docker container to access private repositories.  They are left in place for future reference and possible repeat attempts.

## Errors & Solutions

### WSL Docker Exe

Windows Subsystem for Linux might need some help

```shell
docker.credentials.errors.InitializationError: docker-credential-desktop.exe not installed or not available in PATH
```

```shell
DockerResourcesBin="/mnt/c/Program Files/Docker/Docker/resources/bin"
export PATH=$PATH:$DockerResourcesBin
source ~/.bashrc
```

# Get value of package.json in gitLab CI YML

Source: <https://www.thetopsites.net/article/50527186.shtml>

## Question

```shell
gitlab ci job dependencies
gitlab ci only: variables
gitlab ci read variable from file
gitlab ci variables
gitlab ci npm publish
gitlab ci services
git_strategy
gitlab npm registry example
```

I'm using gitLab CI for my nodejs application. In my YML file I need to call a script to build a docker image. But instead of using latest I need to use the current version of the project.

This version value can be find in the package.json file of the repository.

Is it possible to read the version value of the package.json file to replace latest by the current version?

```shell
# ...
variables:
  CONTAINER_RELEASE_IMAGE: $CI_REGISTRY_IMAGE:latest         # need version value instead of latest

build:
  stage: build
  script:
    # ...
    - cd /opt/core/bundle && docker build -t $CONTAINER_RELEASE_IMAGE .
    - docker push $CONTAINER_RELEASE_IMAGE
```

## Answer

If you are not against installing additional packages you can use jq which allows for much more flexibility (available in repository for both Ubuntu and Alpine). Once you install it (for example apt-get update && apt-get install -yqq jq on Ubuntu):

```shell
- export VERSION=$(cat package.json | jq -r .version)
- cd /opt/core/bundle && docker build -t $CI_REGISTRY_IMAGE:$VERSION .
- docker push $CI_REGISTRY_IMAGE:$VERSION
```

GitLab CI/CD Pipeline Configuration Reference, GitLab CI/CD pipelines are configured using a YAML file called .gitlab-ci.yml within If you get validation error when using specific values (for example, true or false ), try to: test: script: npm run test only: refs: - master - schedules variables:  Before GitLab 8.11, the URL could be added only in GitLab’s UI. The recommended way now is to define it in .gitlab-ci.yml. The url parameter can use any of the defined CI variables, including predefined, secure variables and .gitlab-ci.yml variables. You however cannot use variables defined under script.

```shell
variables:

PACKAGE_VERSION: $(cat package.json | grep version | head -1 | awk -F= "{ print $2 }" | sed 's/[version:,\",]//g' | tr -d '[[:space:]]')  `
```

in your job or template

```shell
.package-template: &package_template
image: docker-hub.registry.integ.fr.auchan.com/docker:latest
stage: package
tags:
  - stocks
script:
  - export VERSION= ``eval $PACKAGE_VERSION``
  - echo "======> Getting VERSION:  $VERSION" `
```

GitLab NPM Registry, Note: You can read more about config.toml in the Runner's docs. Supported: project/group variables, .gitlab-ci.yml variables, config.toml variables, and  I'm using gitLab CI for my nodejs application. In my YML file I need to call a script to build a docker image. But instead of using latest I need to use the current version of the project. This version value can be find in the package.json file of the repository. Is it possible to read the version value of the package.json file to replace

You might not be able to do this purely in the gitlab.yml unfortunately, you could create a shell script as follows and check this into your source control

```shell
#!/bin/sh
args=("$@")
CI_REGISTRY_IMAGE=${args[0]}

PACKAGE_VERSION=$(cat package.json \
| grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')
CONTAINER_RELEASE_IMAGE=$CI_REGISTRY_IMAGE\:$PACKAGE_VERSION
cd /opt/core/bundle && docker build -t $CONTAINER_RELEASE_IMAGE .
docker push $CONTAINER_RELEASE_IMAGE
```

Then execute this script with the argument of $CI_REGISTRY_IMAGE in gitlab.yml

```shell
# ...
build:
  stage: build
  script:
    # ...
    - chmod +x script.sh
    - ./script.sh $CI_REGISTRY_IMAGE
```

To the best of my knowledge this should work for you.

Thank you to DarrenN and dbaba on Github for his package.json version extract shell function

Where variables can be used, Here, we will walk through how to do this with NPM. Using the example project above, this gitlab-ci.yml file will publish Foo anytime changes are made to the  Value Stream; Members added gitlab-ci · a54cc161 Ahmet Kizilay authored Feb 14, package.json 886 Bytes Edit Web IDE. Replace package.json

Monorepo package management workflows, You could generate i18n text domains on the fly. Our final .gitlab-ci.yml will look like this: image: tetraweb  This is an example of a .gitlab-ci.yml that is required for Continuous Integration on GitLab projects. - .gitlab-ci.yml Skip to content All gists Back to GitHub

Running Composer and NPM scripts with deployment via SCP in , Deploying a Node.js module to npm can be a complicated process. GitLab CI is configured by a YAML file named .gitlab-ci.yml within the root of the .gitlab-ci.​yml file where it would be viewable to anyone with read access  GitLab’s AWS Docker image provides the AWS Command Line Interface, which enables you to run aws commands. As part of your deployment strategy, you can run aws commands directly from .gitlab-ci.yml by specifying GitLab’s AWS Docker image. Some credentials are required to be able to run aws commands:

Continuous Deployment to npm using GitLab CI, Gitlab CI working version PACKAGE_VERSION=$(cat package.json | grep version /47234740/read-name-property-of-package-json-file-with-bash/​47234821  Changing gitlab.yml and application.yml settings Some of GitLab’s features can be customized through gitlab.yml . If you want to change a gitlab.yml setting with Omnibus GitLab, you need to do so via /etc/gitlab/gitlab.rb .

## Comments

You also have to trim whitespaces <https://gist.github.com/DarrenN/8c6a5b969481725a4413#gistcomment-1678696>

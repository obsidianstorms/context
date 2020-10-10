#! /usr/bin/env node
// const shell = require("shelljs");
const package = require("../package.json");

// shell.exec(`docker-compose exec -w /repo ${package.docker} /bin/bash`);
console.log(`docker-compose exec -w /repo ${package.docker} /bin/bash`);
// console.log(`docker-compose exec -e SSH_AUTH_SOCK=/ssh-agent -w /repo ${package.docker} /bin/bash`);

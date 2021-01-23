#! /usr/bin/env node
const shell = require("shelljs");

shell.exec(`docker-compose stop`);

// docker volume ls
// docker volume rm name
// docker-compose down

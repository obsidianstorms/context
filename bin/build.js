#! /usr/bin/env node
const shell = require("shelljs");

shell.exec(`docker-compose build --build-arg gitcommithash=fillerhash`);

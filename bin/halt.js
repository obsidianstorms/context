#! /usr/bin/env node
const shell = require("shelljs");
const { id } = require("./src/get-docker-id");

shell.exec(`docker-compose stop "${id}"`);

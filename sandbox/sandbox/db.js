"use strict";

const pg = require("pg");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

console.log(process.env.POSTGRES_DB);

const dbType = "postgres://";
const dbName = process.env.POSTGRES_DB;
const dbUser = process.env.POSTGRES_USER;
const dbPass = process.env.POSTGRES_PASSWORD;
const dbPort = process.env.POSTGRES_PORT;
const dbHost = process.env.POSTGRES_HOST;
const connectionString = `${dbType}${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`

const client = new pg.Client(connectionString);

client.connect();


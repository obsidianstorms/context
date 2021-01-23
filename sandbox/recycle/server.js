"use strict";

const express = require("express");
const path = require("path");

const createLogger = require("logging").default;

const logger = createLogger("Sommelier - Client Server");

const app = express();
const PORT = 5501;

// app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/'));
app.use('/css', express.static(path.join(__dirname, '../../node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '../../node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, '../../node_modules/jquery/dist')))
app.use('/js', express.static(path.join(__dirname, '../../node_modules/@popperjs/core/dist/umd')))

app.get("/", (request, result) => {
  result.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});

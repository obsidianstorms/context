const shell = require("shelljs");
const package = require("../../package.json");

const dockerName = `${__dirname.split("/").slice(-3)[0]}_${package.docker}`;
const dockerId = shell.exec(
  `docker ps -aqf 'name=${dockerName}'`,
  {silent: true}
).stdout;

module.exports = {
  id: dockerId
}

const dotenv = require("dotenv");
const { FusionAuthClient } = require("fusionauth-node-client");

dotenv.config();

const client = new FusionAuthClient(
  process.env.FUSION_KEY,
  "http://localhost:9011"
);

function handleResponse(clientResponse) {
  console.info(JSON.stringify(
    clientResponse.successResponse.user, null, 2
  ));
}

client.retrieveUserByEmail("flintweather@gmail.com").then(handleResponse);


const axios = require("axios");

async function query() {
  return await axios({
    headers: {
      Authorization: "key",
      "X-FusionAuth-TenantId": "id",
    },
    method: "get",
    url: "http://172.21.0.4:9011/api/user",
  });
}

(async function () {

  const r = await query();
  console.log(r);
})();

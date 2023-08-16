const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs");

// Read environment variables from "testenv". Override environment vars if they are already set. https://www.npmjs.com/package/dotenv
const TESTENV = path.resolve(__dirname, "testenv");
if (fs.existsSync(TESTENV)) {
  const envConfig = dotenv.parse(fs.readFileSync(TESTENV));
  Object.keys(envConfig).forEach((k) => {
    process.env[k] = envConfig[k];
  });
}

var ISSUER =
  process.env.ISSUER || "https://dev-98622829.okta.com/oauth2/default";
var CLIENT_ID = process.env.CLIENT_ID || "0oaaug0y7pWTlqosA5d7";
var CLIENT_SECRET =
  process.env.CLIENT_SECRET ||
  "dewhGlaLC5r0QESE2Ga0bHO66c0dYgBJf3SeJ8uis4kKrJ4vgV9G75x_kJMrwkpq";
var SPA_CLIENT_ID = process.env.SPA_CLIENT_ID || "0oaauehnasfs6GYBW5d7";
var OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK
  ? true
  : false;

module.exports = {
  webServer: {
    port: 3000,
    oidc: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      issuer: ISSUER,
      appBaseUrl: "http://localhost:3000",
      scope: "openid profile email",
      testing: {
        disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
      },
    },
  },
  resourceServer: {
    port: 3000,
    oidc: {
      clientId: SPA_CLIENT_ID,
      issuer: ISSUER,
      testing: {
        disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
      },
    },
    assertClaims: {
      aud: "api://default",
      cid: SPA_CLIENT_ID,
    },
  },
};

const {
  App
} = require('@slack/bolt');
const dotenv = require('dotenv');
dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_USER_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

module.exports = app;

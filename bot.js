const {
  RTMClient
} = require('@slack/rtm-api');
const {
  WebClient
} = require('@slack/web-api');
const dotenv = require('dotenv');

dotenv.config();

let channel;

const token = process.env.SLACK_TOKEN;

const rtm = new RTMClient(token);
const web = new WebClient(token);

rtm.on('authenticated', async (rtmStartData) => {
  const {
    team: {
      id: teamId
    }
  } = rtmStartData
  const {
    members
  } = await web.users.list()

  channel = await web.im.open({ user: members[1].id });
  console.log(channel);
});

rtm.on('ready', async (event) => {
  console.log('Ready:', event);
});

rtm.on('user_typing', (event) => {
  console.log(event);
})

rtm.on('message', async (event) => {
  const { text, channel, user } = event

  switch (text) {
    case 'start':
      await rtm.sendMessage('Hello there', channel);
      break;

    default:
      break;
  }
})

rtm.start().catch(console.error);

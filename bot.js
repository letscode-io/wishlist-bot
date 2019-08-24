const {
  RTMClient
} = require('@slack/rtm-api');
const {
  WebClient
} = require('@slack/web-api');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/user')

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

rtm.on('ready', async () => {
  console.log('Ready');
});

rtm.on('user_typing', (event) => {
  console.log(event);
})

rtm.on('message', async (event) => {
  const { text, channel, user: slackUserId } = event

  switch (true) {
    case text === 'start':
      await rtm.sendMessage('Hello, please enter /birthday DD-MM-YYYY', channel);
      await User.create({ slackUserId, channel });
      break;
    case /^birthday/.test(text):
      const [command, birthday] = text.match(/^birthday\s(.+)$/);
      const [day, month, year] = birthday.split('-');
      const birthDate = new Date(year, month - 1, day);

      const user = await User.findOneAndUpdate({ slackUserId }, { birthDate });
      break;

    default:
      break;
  }
})

rtm.start().catch(console.error);

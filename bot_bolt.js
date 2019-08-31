const {
  App
} = require('@slack/bolt');
const {
  parse
} = require("date-fns")
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/user')

const start = require('./messages/start')
const wish = require('./messages/wish')
const wishlist = require('./messages/wishlist')

const app = new App({
  token: process.env.SLACK_BOT_USER_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.message('start', start);
app.message('wish', wish);
app.message('wishlist', wishlist);

app.action('set_birthday', async ({
  body: {
    actions,
    channel,
    user
  },
  ack,
  say
}) => {
  // Acknowledge the action
  ack();
  const rawDate = actions[0].selected_date;
  const birthDate = parse(rawDate, 'yyyy-MM-dd', new Date())
  const dbUser = await User.findOneAndUpdate({
    slackUserId: user.id
  }, {
    birthDate,
    channel: channel.id
  });
  say(`${dbUser.slackUserId} has been created.`);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();

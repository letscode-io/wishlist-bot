const User = require('../models/user')

module.exports = async function({
  message: { text, user: slackUserId },
  say,
  context: { matches: [_, link] }
}) {
  const wish = { link, title: "wish" };

  const dbUser = await User.findOneAndUpdate({ slackUserId }, { $push: { wishes: wish } });

  say(`${link} has been added.`);
};

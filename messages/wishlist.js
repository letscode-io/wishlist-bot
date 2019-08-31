const User = require('../models/user')

module.exports = async function({
  message: { user: slackUserId },
  say
}) {
  const dbUser = await User.findOne({ slackUserId });

  say(dbUser.wishes.join("\n"));
};

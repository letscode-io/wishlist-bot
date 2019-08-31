const User = require('../models/user')

module.exports = async function({
  message: { text, user: slackUserId },
  say
}) {
  const [_, link] = text.split("wish");
  const wish = { link, title: "wish" };

  const dbUser = await User.findOneAndUpdate({ slackUserId }, { wishes: [wish] });

  say(`${link} has been added.`);
};

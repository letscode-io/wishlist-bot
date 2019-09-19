const User = require("../models/user");
const datePicker = require("../blocks/date_picker");

module.exports = async function({
  message: { text, user: slackUserId, team: slackTeamId },
  say,
  context: {
    user: contextUser,
    matches: [_, link]
  }
}) {
  const user =
    contextUser ||
    (await User.findOne({
      slackUserId,
      slackTeamId
    }));

  if (!user) {
    return say({ blocks: datePicker() });
  }

  const wish = { link, title: "wish" };

  await user.update({ $push: { wishes: wish } });

  say(`_${link}_ has been added :sparkles:`);
};

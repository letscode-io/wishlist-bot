const User = require("../models/user");
const datePicker = require("../blocks/date_picker");

module.exports = async function({
  message: { text, user: slackUserId },
  say,
  context: {
    user,
    matches: [_, link]
  }
}) {
  if (!user) {
    return say({ blocks: datePicker() });
  }

  const wish = { link, title: "wish" };

  await user.update(
    { $push: { wishes: wish } }
  );

  say(`${link} has been added.`);
};

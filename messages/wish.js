const datePicker = require("../blocks/date_picker");

module.exports = async function({
  say,
  context: {
    user,
    matches: [_, link]
  }
}) {
  // If user didn't set birthday date, ask him to set it
  if (!user) {
    return say({ blocks: datePicker() });
  }

  const wish = { link, title: "wish" };

  await user.update({ $push: { wishes: wish } });

  say(`_${link}_ has been added :sparkles:`);
};

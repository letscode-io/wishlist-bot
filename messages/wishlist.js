const User = require("../models/user");
const datePicker = require("../blocks/date_picker");

const getWishesBlock = require("../helpers/get_wishes_block")

module.exports = async function({
  message: { user: slackUserId },
  context: { user },
  say
}) {

  if (!user) {
    return say({ blocks: datePicker() });
  }

  let message;

  if (user.wishes.length > 0) {
    message = {
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Hello User, here's the list of your wishes:"
          }
        },
        {
          type: "divider"
        },
        ...getWishesBlock(user.wishes, { editable: true })
      ]
    };
  } else {
    message = "You haven't wished anything yet.";
  }

  say(message);
};

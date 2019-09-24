const datePicker = require("../blocks/date_picker");

const getWishesBlock = require("../blocks/get_wishes_block");

module.exports = async function({
  context: { user },
  say
}) {
  // If user didn't set birthday date, ask him to set it
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

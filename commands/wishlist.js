const User = require('../models/user')
const getWishesBlock = require("../blocks/get_wishes_block")

/**
 * Handle /wishlist @nickname command
 */

module.exports = async ({ ack, say, command }) => {
  ack();

  const text = command.text.match(/^<@(.*)\|(.*)>$/);

  const user = await User.findOne({ slackUserId: text[1], slackTeamId: command.team_id });

  if (!user) {
    say("The user has not applied their wishlist yet.");
  }

  say({
    blocks: [{
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Here's the wishlist of the user:`
        }
      },
      {
        "type": "divider"
      },
      ...getWishesBlock(user.wishes, { editable: false })
    ]
  });
}

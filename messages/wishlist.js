const User = require('../models/user')

module.exports = async function ({
  message: {
    user: slackUserId
  },
  say
}) {
  const dbUser = await User.findOne({
    slackUserId
  });

  let message

  if (dbUser.wishes.length > 0) {
    const wishSections = dbUser.wishes.map(wish => {
      return {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": wish.link
        },
        "accessory": {
          "type": "button",
          "style": "danger",
          "text": {
            "type": "plain_text",
            "text": "Delete",
            "emoji": true
          },
          "action_id": "delete_wish_from_list",
          "value": wish.id
        }
      }
    })

    message = {
      blocks: [{
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "Hello User, here's the list of your wishes:"
          }
        },
        {
          "type": "divider"
        },
        ...wishSections
      ]
    }
  } else {
    message = "You haven't wished anything yet."
  }

  say(message)
};

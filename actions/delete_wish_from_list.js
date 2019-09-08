const app = require("../app")
const User = require('../models/user')

module.exports = async ({
  context,
  body: {
    actions,
    channel,
    user,
    message
  },
  ack,
  say
}) => {
  // Acknowledge the action
  ack();

  let dbUser = await User.findOneAndUpdate({
    slackUserId: user.id
  }, {
    $pull: {
      wishes: {
        _id: actions[0].value
      }
    }
  },
  { new: true })

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

  const newMessageBlocks =[{
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

  app.client.chat.update({
    token: context.botToken,
    channel: channel.id,
    blocks: newMessageBlocks,
    ts: message.ts
  })
}

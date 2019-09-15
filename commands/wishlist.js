const User = require('../models/user')

module.exports = async ({ ack, say, command }) => {
  ack();

  const text = command.text.match(/^<@(.*)\|(.*)>$/);

  const user = await User.findOne({ slackUserId: text[1], slackTeamId: command.team_id });

  const wishSections = user.wishes.map(wish => {
    return {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": wish.link
      }
    }
  })

  const message = {
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

  say(message);
}

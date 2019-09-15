const {
  parse
} = require('date-fns')
const User = require('../models/user')

module.exports = async ({
  body: {
    actions,
    channel,
    user,
    team
  },
  ack,
  say
}) => {
  // Acknowledge the action
  ack();

  const rawDate = actions[0].selected_date;
  const birthDate = parse(rawDate, 'yyyy-MM-dd', new Date())
  let dbUser = await User.findOne({ slackUserId: user.id, slackTeamId: team.id })

  if (dbUser) {
    dbUser.update({ birthDate, slackImChannel: channel.id })
    say(`${dbUser.slackUserId} has been updated.`);
  } else {
    dbUser = await User.create({
      birthDate,
      slackImChannel: channel.id,
      slackTeamId: team.id,
      slackUserId: user.id,
    })
    say(`${dbUser.slackUserId} has been created.`);
  }
}

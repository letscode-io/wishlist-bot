const {
  parse
} = require('date-fns')

module.exports = async ({
  body: {
    actions,
    channel,
    user
  },
  ack,
  say
}) => {
  // Acknowledge the action
  ack();
  const rawDate = actions[0].selected_date;
  const birthDate = parse(rawDate, 'yyyy-MM-dd', new Date())
  let dbUser = await User.findOne({ slackUserId: user.id })

  if (dbUser) {
    dbUser.update({ birthDate, channel: channel.id })
    say(`${dbUser.slackUserId} has been updated.`);
  } else {
    dbUser = await User.create({
      slackUserId: user.id,
      birthDate,
      channel: channel.id
    })
    say(`${createdUser.slackUserId} has been created.`);
  }
}

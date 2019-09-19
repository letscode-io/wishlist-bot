const User = require("../models/user");

module.exports = async ({ payload: { user, team }, context, say, next }) => {
  const dbUser = await User.findOne({
    slackUserId: user,
    slackTeamId: team
  })

  context.user = dbUser
  next();
};

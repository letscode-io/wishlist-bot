const User = require("../models/user");

module.exports = async ({ payload: { user, team }, context, say, next }) => {
  console.log("global middleware");

  const dbUser = await User.findOne({
    slackUserId: user,
    slackTeamId: team
  })

  context.user = dbUser
  next();
};

/**
 * Global Middleware that gets User from DB
 * and set it to the context
 */
const User = require("../models/user");

const getUserId = ({ user, event, user_id }) => user && user.id || event && event.user || user_id
const getTeamId = ({ team, event, team_id }) => team && team.id || event && event.team || team_id

module.exports = async ({ body, context, next }) => {
  const slackUserId = getUserId(body);
  const slackTeamId = getTeamId(body);

  if (slackUserId && slackTeamId) {
    const dbUser = await User.findOne({ slackUserId, slackTeamId })
    context.user = dbUser
  }

  next();
};

/**
 * Global Middleware that gets User from DB
 * and set it to the context
 */
const User = require("../models/user");

const getUserId = (body) => body.user && body.user.id || body.event && body.event.user || body.user_id
const getTeamId = (body) => body.team && body.team.id || body.event && body.event.team || body.team_id

module.exports = async ({ body, context, next }) => {
  const slackUserId = getUserId(body);
  const slackTeamId = getTeamId(body);

  if (userId && teamId) {
    const dbUser = await User.findOne({ slackUserId, slackTeamId })
    context.user = dbUser
  }

  next();
};

const { parseISO, getYear, setYear } = require("date-fns");
const User = require("../models/user");

const DEFAULT_YEAR = 1990;

module.exports = async ({
  body: { actions, channel, user, team },
  ack,
  say,
  context: { user: dbUser }
}) => {
  // Acknowledge the action
  ack();

  // Preparing the date for parsing
  const selectedDate = `${actions[0].selected_date}T00:00:00.000Z`;
  // Setting birth day and month in DEFAULT_YEAR for convenient searching
  const parsedDate = parseISO(selectedDate)
  const birthDate = setYear(parsedDate, DEFAULT_YEAR);
  // Setting birth year in the separate field
  const yearOfBirthday = getYear(parsedDate);

  if (dbUser) {
    await dbUser.update({
      birthDate,
      yearOfBirthday,
      slackImChannel: channel.id
    });
    say(`${dbUser.slackUserId} has been updated.`);
  } else {
    dbUser = await User.create({
      birthDate,
      yearOfBirthday,
      slackImChannel: channel.id,
      slackTeamId: team.id,
      slackUserId: user.id
    });
    say(`${dbUser.slackUserId} has been created.`);
  }
};

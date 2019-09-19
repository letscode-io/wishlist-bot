const { parseISO, getYear, setYear } = require("date-fns");
const User = require("../models/user");

const DEFAULT_YEAR = 1990;

module.exports = async ({
  body: { actions, channel, user, team },
  ack,
  say
}) => {
  // Acknowledge the action
  ack();

  const selectedDate = `${actions[0].selected_date}T00:00:00.000Z`;
  const birthDate = setYear(parseISO(selectedDate), DEFAULT_YEAR);
  const yearOfBirthday = getYear(birthDate);

  let dbUser = await User.findOne({
    slackUserId: user.id,
    slackTeamId: team.id
  });

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

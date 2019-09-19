const COMMANDS = {
  start: "Initializes bot and sets your birthday",
  "wish <URL>": "Adds new wish",
  wishlist: "Shows list of wishes"
};

module.exports = function({ context: { user }, say }) {
  const blocks = Object.keys(COMMANDS).map(command => {
    return {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${command}*: ${COMMANDS[command]}`
      }
    };
  });

  say({ blocks });
};

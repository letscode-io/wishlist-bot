module.exports = () => {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Please pick your birth date."
      },
      accessory: {
        type: "datepicker",
        initial_date: "1990-05-18",
        placeholder: {
          type: "plain_text",
          text: "Select a date",
          emoji: true
        },
        action_id: "set_birthday"
      }
    }
  ];
};

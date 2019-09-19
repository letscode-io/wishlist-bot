const datePicker = require("../blocks/date_picker");

module.exports = function({ message, say }) {
  try {
    say({ blocks: datePicker() });
  } catch (error) {}
};

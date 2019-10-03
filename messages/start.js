const datePicker = require("../blocks/date_picker");

module.exports = function({ say }) {
  say({ blocks: datePicker() });
};

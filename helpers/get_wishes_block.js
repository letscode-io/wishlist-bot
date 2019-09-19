function getAccessory(wish) {
  return {
    type: "button",
    style: "danger",
    text: {
      type: "plain_text",
      text: "Delete",
      emoji: true
    },
    action_id: "delete_wish_from_list",
    value: wish.id
  }
}

module.exports = (wishes, options) => {
  const accessory = options.editable ? getAccessory(wish) : {};

  return wishes.map(wish => {
    return {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": wish.link
      },
      accessory
    }
  })
}

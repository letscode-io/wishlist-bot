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
  return wishes.map(wish => {
    const accessory = options.editable ? getAccessory(wish) : {};

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

const app = require("../app");
const User = require("../models/user");

module.exports = async ({
  context,
  body: { actions, channel, user, message },
  ack,
  say
}) => {
  ack();

  let dbUser = await User.findOneAndUpdate(
    {
      slackUserId: user.id
    },
    {
      $pull: {
        wishes: {
          _id: actions[0].value
        }
      }
    },
    { new: true }
  );

  const wishSections = dbUser.wishes.map(wish => {
    return {
      type: "section",
      text: {
        type: "mrkdwn",
        text: wish.link
      },
      accessory: {
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
    };
  });

  const areWishesEmpty = wishSections.length > 0;
  const header = areWishesEmpty
    ? "Hello User, here's the list of your wishes:"
    : "Hey, you don't have any wishes anymore. Type *wish* _item_ to add some!";
  const newMessageBlocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: header
      }
    },
    areWishesEmpty && { type: "divider" },
    ...wishSections
  ].filter(section => section);

  app.client.chat.update({
    token: context.botToken,
    channel: channel.id,
    blocks: newMessageBlocks,
    ts: message.ts
  });
};

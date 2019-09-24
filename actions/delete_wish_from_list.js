const app = require("../app");
const User = require("../models/user");
const getWishesBlock = require('../blocks/get_wishes_block')

module.exports = async ({
  context,
  body: { actions, channel, user, message },
  ack
}) => {
  ack();

  // Remove wish from wishlist and return user
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

  const wishSections = getWishesBlock(dbUser.wishes, { editable: true });

  const areWishesNotEmpty = wishSections.length > 0;
  const header = areWishesNotEmpty
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
    areWishesNotEmpty && { type: "divider" },
    ...wishSections
  ].filter(section => section);

  // Update the message that sent delete action
  app.client.chat.update({
    token: context.botToken,
    channel: channel.id,
    blocks: newMessageBlocks,
    ts: message.ts
  });
};

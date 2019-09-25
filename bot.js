const app = require("./app");
const cron = require("node-cron");
const {
  startOfToday,
  setYear,
  addDays,
} = require("date-fns");
const User = require("./models/user");

// Messages Handlers
const start = require("./messages/start");
const wish = require("./messages/wish");
const wishlist = require("./messages/wishlist");
const help = require("./messages/help");

// Actions Handlers
const setBirthday = require("./actions/set_birthday");
const deleteWishFromList = require("./actions/delete_wish_from_list");

// Commands Handlers
const wishlistCommand = require("./commands/wishlist");

// Middlewares
const globalMiddleware = require("./middlewares/global");

app.use(globalMiddleware);

/**
 * Add Empty Middleware to the list
 * Otherwise previous one doesn't work correctly
 * There is some bug
 */
app.use(() => {});

app.message("start", start);
app.message(/^wish\s(.*)/, wish);
app.message("wishlist", wishlist);
app.message("help", help);

app.action("set_birthday", setBirthday);
app.action("delete_wish_from_list", deleteWishFromList);

app.command("/wishlist", wishlistCommand);

/**
 * Cron job that try to find users who
 * has a birthday in two weeks and send them notification
 * once a day
 */
cron.schedule("0 14 * * 1-5", async () => {
  const inTwoWeeks = addDays(setYear(startOfToday(), 1990), 14);
  const users = await User.find({
    birthDate: inTwoWeeks
  });

  users.forEach(async user => {
    await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_USER_TOKEN,
      channel: user.slackImChannel,
      text:
        "Hey, your birthday is in 2 weeks. Please add some items to your wishlist!"
    });
  });
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
